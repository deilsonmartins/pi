import {Router} from 'express'

import {celebrate, Joi} from 'celebrate';

import teachersController from '../controllers/teachersController'

import subjectsController from '../controllers/subjectsController'

import multer from 'multer'

import multerConfig from '../config/multer'

const upload = multer(multerConfig)

const Routes = Router()

Routes.get('/subjects', subjectsController.index)

Routes.post('/teachers', 
celebrate(
    {
        body: Joi.object().keys(
            {
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsaap: Joi.number().required(),
                latitude: Joi.string().required(),
                longitude: Joi.string().required(),
                city: Joi.string().required(),
                uf: Joi.string().required().max(2),
                subjects: Joi.required(),
            }
        )
    },
    {
        abortEarly: false,
    }
),
teachersController.create)

Routes.put('/teachers/image', upload.single('image'), teachersController.update)

Routes.get('/teachers', teachersController.index)

Routes.get('/teachers/:id', teachersController.show)

export default Routes