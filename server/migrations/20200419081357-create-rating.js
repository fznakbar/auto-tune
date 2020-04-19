'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Ratings', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			UserId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: `Users`,
				},
				onUpdate: 'cascade',
				onDelete: 'cascade',
			},
			MusicId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: `Music`,
				},
				onUpdate: 'cascade',
				onDelete: 'cascade',
			},
			like: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Ratings');
	},
};
