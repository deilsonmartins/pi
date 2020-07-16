import knex from '../database/connection';

class subjectsController
{
    async index(request, response)
    {
        const subjects = await knex('subjects').select('*');
            
            const serializedSubjects = subjects .map(subject=>{
                return {
                    id: subject.id,
                    name: subject.title,
                    image_url: `${process.env.ADRESS_URL}:${process.env.PORT_SERVER}/uploads/subjects/${subject.image}`,
                }
            })
            return response.json(serializedSubjects);
    }
}

export default new subjectsController()
