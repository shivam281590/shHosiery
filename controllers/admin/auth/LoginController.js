const session = require('express-session');
const {adminRoutes}=require('../../../config/route');
const {User} = require('../../../models');
const bcryptjs=require('bcryptjs');
const validator=require('validator');

exports.index=(req,res)=>{
    const { emailerror,passworderror, email } = req.query;
    res.render('admin/auth/login',{
        routes:adminRoutes,
        email:email || '',
        emailerror:emailerror || null,
        passworderror:passworderror || null,
        error: req.flash('error'),
        success: req.flash('success')
    });
}

exports.auth=async (req,res)=>{
    if(validator.isEmpty(req.body.email)){
        return res.redirect(`/admin${adminRoutes.getLogin}?emailerror=Username is required&email=${encodeURIComponent(req.body.email)}`);
    }
    if(validator.isEmpty(req.body.password)){
        return res.redirect(`/admin${adminRoutes.getLogin}?passworderror=Password is required&email=${encodeURIComponent(req.body.email)}`);
    }

    const user = await User.findOne({ where: { email: req.body.email } });

    if(!user){
        req.flash('error','Data does not matched in our records!');
        return res.redirect(`/admin${adminRoutes.getLogin}?email=${encodeURIComponent(req.body.email)}`);
    }

    if(!user['is_admin']){
        req.flash('error','Data does not matched in our records!');
        return res.redirect(`/admin${adminRoutes.getLogin}?email=${encodeURIComponent(req.body.email)}`);
    }

    if(user){
        if(!bcryptjs.compareSync(req.body.password, user.password)){
            req.flash('error','Data does not matched in our records!');
            return res.redirect(`/admin${adminRoutes.getLogin}?email=${encodeURIComponent(req.body.email)}`);
        }
    
        req.session.auth=true;
        req.session.authUser=user;

        return res.redirect(`/admin`);
    }
    else{
        return res.status(500).render('errors/500');
    }

}

exports.logout=(req,res,next)=>{
    req.session.destroy((err)=>{
        if(err){
            res.status(500).send('Failed to logout');
        }

        res.redirect(`/admin${adminRoutes.getLogin}`);
    })
}