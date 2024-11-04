const { adminRoutes } = require("../config/route")

module.exports=(req,res,next)=>{
    res.locals.adminRoutes=adminRoutes;
    next();
    // req.locale.frontendRoutes
}