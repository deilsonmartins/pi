exports.up = function (knex)
{
    return knex.schema.createTable('teachers_subjects', table =>
    {
        table.increments('id').primary();

        table.integer('teacher_id').notNullable()
        table.foreign('teacher_id').references('teachers.id')

        table.integer('subject_id').notNullable()
        table.foreign('subject_id').references('subjects.id')
    })
}

exports.down = function (knex)
{
    return knex.schema.dropSchema('teachers_subjects');
}