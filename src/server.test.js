const server = require('./server');
const request = require('supertest');

describe("Test Apollo Server Initial Functionality", () => {
    
    let status;

    beforeEach( async () => {
        status = await  request(server)
                        .post('/graphql')
                        .send({query: `query { status }`});

                
    })

    test('It returns 200 status', () => {

        expect(status.status).toBe(200);
    })

    test('it returns an object whose value matches the expected object', () => {

        const expected = {status: "Apollo Server is Running!"};

        expect(status.body.data).toMatchObject(expected);
    })
})
