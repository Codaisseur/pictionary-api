'use strict';

const service = require('feathers-mongoose');
const game = require('./game-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    overwrite: false, // (default: true) Updates completely replace existing documents.
    lean: false, // (default: false) [optional] - When set to true runs queries faster by returning plain mongodb objects instead of mongoose models.
    Model: game,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/games', service(options));

  // Get our initialize service to that we can bind hooks
  const gameService = app.service('/games');

  // Set up our before hooks
  gameService.before(hooks.before);

  // Set up our after hooks
  gameService.after(hooks.after);
};
