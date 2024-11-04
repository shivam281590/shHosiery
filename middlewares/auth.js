const { adminRoutes } = require("../config/route");

exports.redirectIfUserIsNotAuthenticated=(req,res,next)=>{
    if(req.session.auth && req.session.authUser && req.session.authUser.is_admin){
        next();
    }
    else{
        return res.redirect(`/admin${adminRoutes.getLogin}`);
    }

}

exports.redirectIfUserHaveAuth=(req,res,next)=>{
    if(req.session.auth && req.session.authUser && req.session.authUser.is_admin){
        return res.redirect(`/admin`);
    }
    else{
        next();
    }

}