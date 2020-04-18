'use strict';
module.exports = (sequelize, DataTypes) => {
	const Music = sequelize.define(
		'Music',
		{
			title: {
				type: DataTypes.STRING,
				validation: {
					notEmpty: {
						msg: `Title can't be empty!`,
					},
				},
			},
			musicData: {
				type: DataTypes.STRING,
				validation: {
					notEmpty: {
						msg: `musicData can't be empty!`,
					},
				},
			},
      UsersId: DataTypes.INTEGER,
      allowNull: false,
		},
		{}
	);
	Music.associate = function (models) {
		models.User.hasMany(models.Music)
	};
	return Music;
};
