const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const { User } = require('../db/models');

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
	console.log('Google Client ID / Secret not found. Skipping Google OAuth.');
} else {
	const googleConfig = {
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: process.env.GOOGLE_CALLBACK
	};

	const verificationCallback = async (accessToken, refreshToken, profile, done) => {
		try {
			const [ user ] = await User.findOrCreate({
				where: {
					googleId: profile.id
				},
				defaults: {
					email: profile.emails[0].value
				}
			});
			done(null, user);
		} catch (error) {
			done(error);
		}
	};

	const strategy = new GoogleStrategy(googleConfig, verificationCallback);

	passport.use(strategy);

	router.get('/', passport.authenticate('google', { scope: [ 'email', 'profile' ] }));

	router.get(
		'/callback',
		passport.authenticate('google', {
			successRedirect: '/home',
			failureRedirect: '/login'
		})
	);
}

module.exports = router;
