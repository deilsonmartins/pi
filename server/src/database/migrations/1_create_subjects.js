exports.up = function (knex)
{
    return knex.schema.createTable('subjects', table =>
    {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    })
}

exports.down = function (knex)
{
    return knex.schema.dropSchema('subjects');
}