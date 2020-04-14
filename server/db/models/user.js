const Sequelize = require('sequelize');
const crypto = require('crypto');
const _ = require('lodash');

const db = require('../db');

const User = db.define('user', {
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		get() {
			return () => this.getDataValue('password');
		}
	},
	salt: {
		type: Sequelize.STRING,
		get() {
			return () => this.getDataValue('salt');
		}
	},
	googleId: {
		type: Sequelize.STRING
	}
});

// ---------- INSTANCE METHODS ---------- //

User.prototype.correctPassword = function(enteredPwd) {
	return User.encryptPassword(enteredPwd, this.salt()) === this.password();
};

User.prototype.sanitize = () => {
	return _.omit(this.toJSON(), [ 'password', 'salt' ]);
};

// ----------- CLASS METHODS ----------- //

User.generateSalt = () => {
	return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = (plainText, salt) => {
	return crypto.createHash('RSA-SHA256').update(plainText).update(salt).digest('hex');
};

// --------------- HOOKS -------------- //

const setSaltAndPassword = user => {
	// we need to salt and hash again when user enters password for the first time
	// and do it again whenever they change it
	if (user.changed('password')) {
		user.salt = User.generateSalt();
		user.password = User.encryptPassword(user.password(), user.salt());
	}
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate(users => {
	users.forEach(setSaltAndPassword);
});

module.exports = User;
