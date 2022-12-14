'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'BannerDetails',
        'status', {
          type: Sequelize.BOOLEAN,
        }
      )])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'BannerDetails',
        'status'
      )])
  }
};
