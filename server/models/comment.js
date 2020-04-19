'use strict';
module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define(
		'Comment',
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
			comment: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: `Comment can't be empty`,
					},
				},
			},
		},
		{}
	);
	Comment.associate = function (models) {
		Comment.belongsTo(models.Music);
		Comment.belongsTo(models.User);
	};
	return Comment;
};
