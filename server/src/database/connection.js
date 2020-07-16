import knex from 'knex'

import configuration from '../../knexfile'

class DataBase
{
    constructor()
    {
        this.init()
    }

    init()
    {
        this.connection = knex(configuration);
    }
}

export default new DataBase().connection;