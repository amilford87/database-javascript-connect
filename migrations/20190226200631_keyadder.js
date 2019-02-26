
exports.up = function(knex, Promise) {
    return Promise.all([
  knex.schema.alterTable('milestones', function(table) {
    table.integer('famousId');  
    table.foreign('famousId').references('id').inTable('famous_people');
  })
]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('milestones', function(table){
        table.dropForeign('famousId'),
        table.dropColumn('famousId')
    })
  ]);
};
