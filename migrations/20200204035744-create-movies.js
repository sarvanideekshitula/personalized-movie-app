'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('movies', {
			id: {
				type: Sequelize.STRING,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING
			},
			genres: {
				type: Sequelize.ARRAY(Sequelize.INTEGER)
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('movies');
	}
};