'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Music', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
			},
			musicData: {
				type: Sequelize.STRING,
			},
			UserId: {
				type: Sequelize.INTEGER,
				references: {
					model: `Users`,
					key: `id`,
				},
				onUpdate: 'cascade',
				onDelete: 'cascade',
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
		return queryInterface.dropTable('Music');
	},
};
