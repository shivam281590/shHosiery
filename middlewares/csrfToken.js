const Tokens = require('csrf');
const tokens = new Tokens();

exports.generateCsrfToken = (req, res, next) => {
    if (!req.session.csrfSecret) {
        // Generate a new CSRF secret if it doesn't exist in the session
        req.session.csrfSecret = tokens.secretSync();
    }
    // Generate a CSRF token using the secret stored in the session
    const token = tokens.create(req.session.csrfSecret);

    // Store the token in the session and set it to res.locals for the view
    res.locals.csrfToken = token;
    req.session.csrfToken = token;

    next();
};

exports.validateCsrfToken = (req, res, next) => {

    if (['POST', 'PUT', 'DELETE','PATCH'].includes(req.method)) {
        const tokenFromClient = '_csrf' in req.body ? req.body._csrf : '';
        const tokenFromServer = req.session.csrfToken;
        const secretFromServer = req.session.csrfSecret;
        if (tokens.verify(secretFromServer, tokenFromClient)) {
            next();
        } else {
            res.status(419).render('errors/419');
        }
    } else {
        // Skip CSRF token validation for other methods
        next();
    }
};
