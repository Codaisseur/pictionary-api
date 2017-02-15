'use strict';

// game-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  players: [Schema.Types.ObjectId],
  score: { type: Number, required: true, 'default': 0 },
})

const turnSchema = new Schema({
  team: { type: Number, required: true, 'default': 0 }, // index of the team that's playing
  player: { type: Number, required: true, 'default': 0 }, // index of the player who's drawing
  startedAt: { type: Date },
  score: { type: Number, required: true, 'default': 0 },
  wonBy: { type: Number }, // index of player who won the turn
})

const drawingPointSchema = new Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
})

const lineSchema = new Schema({
  color: { type: String, required: true, 'default': '#000000' },
  thickness: { type: Number, required: true, 'default': 4 },
  points: [drawingPointSchema],
})

const gameSchema = new Schema({
  startedBy: { type: Schema.Types.ObjectId, ref: 'user' },
  teams: [teamSchema],
  turns: [turnSchema],

  word: { type: String, required: true, 'default': 'React' },
  lastGuess: { type: String },
  drawing: [lineSchema],

  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const gameModel = mongoose.model('game', gameSchema);

module.exports = gameModel;
