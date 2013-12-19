/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
 bitService = require('../services/bitcoinService'),
 utils = require('../services/utils'),
 User = mongoose.model('User'),
 Wallet = mongoose.model('Wallet');

/**
 * Auth callback
 */
 exports.authCallback = function(req, res, next) {
    res.redirect('/');
};

/**
 * Show login form
 */
 exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
 exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Logout
 */
 exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
 exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */

 var createWallet = function(callback){
     //create new user wallet

    //create new wallet
    bitService.newAddress().then(function(address){
        var wallet = new Wallet();
        wallet.address = address;
        wallet.created = Date.now();
        wallet.guid = utils.newGuid();

        wallet.save(function(err) {
            if (!err) {
              callback(wallet);
          }
      });
    });
};
exports.create = function(req, res) {
    var user = new User(req.body);

    user.provider = 'local';

    createWallet(function(wallet){
        user.wallet = wallet;
        user.save(function(err) {
            if (err) {
                return res.render('users/signup', {
                    errors: err.errors,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    });
};

/**
 *  Show profile
 */
 exports.show = function(req, res) {
    var user = req.profile;

    res.render('users/show', {
        title: user.name,
        user: user
    });
};

/**
 * Send User
 */
 exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
 exports.user = function(req, res, next, id) {
    User
    .findOne({
        _id: id
    })
    .exec(function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load User ' + id));
        req.profile = user;
        next();
    });
};