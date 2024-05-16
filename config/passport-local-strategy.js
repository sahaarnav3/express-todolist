const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
async (email, password, done) => {
    try {
        const userData = await User.findOne({email: email});
        // console.log(userData);
        if(!userData){
            console.log("Error in finding the User -> Passport");
            return done(null, false, {message: "No user with this email, try again"});
        } else if(userData.password !== password){
            console.log("Entered Wrong Password");
            return done(null, false, {message: "Entered Wrong Password Please, try again"});
        }
        return done(null, userData);
    } catch(err) {
        return done(null, false, {message: "Some unknown error occured, please try again"});
    }
}
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const userData = await User.findById(id);
        return done(null, userData);
    } catch (err) {
        return(null, false, {message: "Error In Finding The User -> Passport"});
    }
});

passport.checkAuthentication = (req, res, next) => {
    
    if(req.isAuthenticated()){
        return next();
    } 
    return res.redirect('/login-user');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if(req.isAuthenticated())
        res.locals.user = req.user;
    next();
}

module.exports = passport;