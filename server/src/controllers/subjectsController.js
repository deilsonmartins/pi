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
                    image_url: `http://192.168.1.8:3333/uploads/subjects/${subject.image}`,
                }
            })
            return response.json(serializedSubjects);
    }
}

export default new subjectsController()
