const supertest = require('supertest')
const { response } = require('../index')
const app = require('../index')


const request = supertest(app)

describe('GET /emails', () => { 
   it('should response the admin with all the emails', async()=>{
      const response = request.get('/api/emails');
      expect((await response).statusCode).toBe(200);
      expect(typeof (await response).body.emails).toBe('object')
   })
 })

 describe('POST /addEmail', () => { 
    it('should post an email to the database', async()=>{
       const add = request.post('/api/addEmail').send({email: 'example@gmail.com'});
       expect((await add).statusCode).toBe(200);
       expect(typeof (await add).body.data.email).toBe('string');
       expect(typeof (await add).body.data._id).toBe('string');
       expect((await add).body.message).toBe('Added!🚀🚀')
    })
  })