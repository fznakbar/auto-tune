'use strict';
module.exports = (sequelize, DataTypes) => {
	const Rating = sequelize.define(
		'Rating',
		{
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: `UserId can't be empty`,
					},
				},
			},
			MusicId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: `MusicId can't be empty`,
					},
				},
			},
			like: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				validate: {
					notNull: {
						msg: `like can't be empty`,
					},
				},
			},
		},
		{}
	);
	Rating.associate = function (models) {
    // associations can be defined here
	};
	return Rating;
};
