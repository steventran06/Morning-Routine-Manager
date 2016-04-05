var db = require('../config');

var Routine = db.Model.extend({
  tableName: 'routines',
  hasTimestamps: true,
  defaults: {
    visits: 0
  },

  user: function() {
    return this.belongsTo(user, 'userId');
  }
});

module.exports = Routine;
