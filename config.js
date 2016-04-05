var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, './db/morningroutine.sqlite')
  }
});
var db = require('bookshelf')(knex);

// knex.schema.dropTableIfExists('routines').then(function() {
//   console.log('dropped');
// });

db.knex.schema.hasTable('routines').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('routines', function (routine) {
      routine.increments('id').primary();
      routine.string('title', 255);
      routine.string('description', 255);
      routine.integer('userId');
      routine.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

// knex.schema.dropTableIfExists('users').then(function() {
//   console.log('dropped');
// });

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (click) {
      click.increments('id').primary();
      click.string('username', 20).unique();
      click.string('password', 50);
      click.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

/************************************************************/
// Add additional schema definitions below
/************************************************************/


module.exports = db;
