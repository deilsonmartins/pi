import knex from '../database/connection';

class teachersController
{
    async index(request, response)
    {
        /*const teachers = await knex('teachers').select('*')

        return response.json({teachers})*/

        const {city, uf, subjects} = request.query;

        const parsedSubjects = String(subjects).split(',').map(subject => Number(subject.trim()))
        
        const teachers = await knex('teachers')
            .join('teachers_subjects', 'teachers.id', '=', 'teachers_subjects.teacher_id')
            .whereIn('teachers_subjects.subject_id', parsedSubjects)
            .where('city', String(city).toLowerCase())
            .where('uf', String(uf).toLowerCase())
            .distinct()
            .select('teachers.*');

            const serializedTeachers = teachers.map(teacher =>{
                return {
                    ...teacher,
                    image_url: `http://192.168.1.8:3333/uploads/${teacher.image}`,
                }
            })
            
            return response.json(serializedTeachers)

    }

    async show(request, response)
    {
        const {id} = request.params

        const user = await knex('teachers').where('id', '=', id)

        if (!user[0])
        {
            return response.json({error: "User does not exists"})
        }

        const subjects = await knex('teachers_subjects')
            .where('teacher_id', '=', id)
            .select('subject_id')
        
        const names_subjects = []

        subjects.map(subject => {
            const {subject_id} = subject

           /* const subject_name = await knex('subjects')
                .where('id', '=', subject_id)
                .select('image')

            names_subjects.push(subject_name)*/
        })

        const serializedTeacher = {
        
            ...user[0],
            image_url: `http://192.168.1.8:3333/uploads/${user[0].image}`,
           subjects : names_subjects
            
        }
                
    
        return response.json(serializedTeacher)
    }

    async create(request, response)
    {
        let {
            name,
            email,
            whatsaap,
            latitude,
            longitude,
            city,
            uf,
            subjects
        } = request.body

        const checksTeacher = await knex('teachers').where('email', '=', email)

        if (checksTeacher[0])
        {
            return response.status(400).json({error: "User does exists. Try other email"})
        }
        
        city = city.toLowerCase()
        uf = uf.toLowerCase()

        const trx = await knex.transaction()

        const teacher = {
            image: 'http://localhost:3333/uploads/adorable.png',
            name,
            email,
            whatsaap,
            latitude,
            longitude,
            city,
            uf,
        }

        const insertIds = await trx('teachers').insert(teacher)

        const teacher_id = insertIds[0]
        const teacherSubjects = subjects
            .map(subject_id => 
                {
                    return {
                        subject_id,
                        teacher_id,
                    }
                })

        await trx('teachers_subjects').insert(teacherSubjects)

        await trx.commit()

        return response.json(
            {
                id: teacher_id,
                ...teacher
            }
        )
    }

    async update(request, response)
    {
        const  image = request.file.filename

        const {id} = request.headers

        await knex('teachers')
            .where('id', '=', id)
            .update({
                image
            })

        return response.status(200).send("Save image")

    }
}

export default new teachersController()