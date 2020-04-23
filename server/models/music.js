'use strict';
module.exports = (sequelize, DataTypes) => {
	const Music = sequelize.define(
		`Music`,
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: `Title can't be empty!`,
					},
				},
			},
			musicData: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: `musicData can't be empty!`,
					},
				},
			},
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
		}
	);
	Music.associate = function (models) {
		Music.belongsTo(models.User);
	};
	return Music;
};
