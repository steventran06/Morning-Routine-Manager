var db = require('../config');
var Routine = require('../models/routine');

var Routines = new db.Collection();

Routines.model = Routine;
module.exports = Routines;
