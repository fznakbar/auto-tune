'use strict';
const bcrypt = require(`../helpers/bcrypt`);

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			username: {
				type: DataTypes.STRING,
				unique: true,
				validate: {
					notEmpty: {
						msg: `Username can't be empty!`,
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: `Password can't be empty!`,
					},
				},
			},
		},
		{
			hooks: {
				beforeCreate: (instance, option) => {
					instance.password = bcrypt.hash(instance.password);
				},
			},
		}
	);
	User.associate = function (models) {
		User.hasMany(models.Music);
		User.hasMany(models.Rating);
		User.hasMany(models.Comment);
	};
	return User;
};
