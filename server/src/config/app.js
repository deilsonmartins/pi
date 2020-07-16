require('dotenv/config');

import express from 'express'

import Routes from '../routes/routes'

import {errors} from 'celebrate'

import  cors from 'cors'

import path from 'path'

import '../database/connection';

class App 
{
    constructor()
    {
        this.server = express()
        this.middlewares()
        this.routes()

    }

    routes()
    {
        this.server.use(Routes)
    }
    middlewares()
    {
        this.server.use(cors())
        this.server.use(express.json())
        this.server.use(errors())
        this.server.use('/uploads/subjects', express.static(path.resolve(__dirname, '..', '..', 'uploads', 'subjects')))
        this.server.use('/uploads', express.static(path.resolve(__dirname, '..', '..', 'uploads')))
    
    }
    


}

export default new App().server;