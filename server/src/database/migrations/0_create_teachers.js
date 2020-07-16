exports.up = function (knex)
{
    return knex.schema.createTable('teachers', table =>
    {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsaap').notNullable();
        table.string('latitude').notNullable();
        table.string('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    })
}

exports.down = function (knex)
{
    return knex.schema.dropSchema('teachers')
}