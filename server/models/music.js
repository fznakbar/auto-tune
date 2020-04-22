'use strict';
module.exports = (sequelize, DataTypes) => {
	const Music = sequelize.define(
		`Music`,
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
				type: DataTypes.TEXT,
				validation: {
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
