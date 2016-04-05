var db = require('../config');


var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  routine: function() {
    return this.hasMany(routine);
  },
});

module.exports = User;