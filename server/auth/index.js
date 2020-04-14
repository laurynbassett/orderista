const router = require('express').Router();

const { User } = require('../db/models');

// LOGIN
router.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });
		if (!user) res.status(401).send('User not found');
		else if (!user.correctPassword(password)) res.status(401).send('Incorrect password');
		else req.login(user, err => (err ? next(err) : res.json(user)));
	} catch (err) {
		next(err);
	}
});

// SIGNUP
router.post('/signup', async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		req.login(user, err => (err ? next(err) : res.json(user)));
	} catch (err) {
		err.name === 'SequelizeUniqueConstraintError' ? res.status(401).send('User already exists') : next(err);
	}
});

// LOGOUT
router.delete('/logout', (req, res) => {
	req.logout();
	req.session.destroy();
	res.sendStatus(204).end();
});

// fetch logged-in user on session
router.get('/me', (req, res) => {
	res.json(req.user);
});

router.use('/google', require('./google'));

module.exports = router;
