const { TestHelper } = require('oi-node-api-framework');
const supertest = require('supertest');
const { server } = require('../../../../../app');

describe('Cliente', () => {
    before(() => {
        TestHelper.before();
    });

    after(() => {
        TestHelper.after();
        server.close();
    });

    it('Deve enviar carregar um cliente por nome', (done) => {
        supertest(server)
            .get('/atendimento-backend/cliente/Diogo')
            .set('x-origin-application', 'atendimento-backend')
            .set('x-origin-channel', 'teste-unitario')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImxvZ2luIjoiZGlvZ28ubGVpdGFvQG9pLm5ldC5iciIsInBlcmZpbCI6ImFkbWluIn0sImlhdCI6MTUxMDQ1NTg3MX0.q8ZxxZ893JGi490N0FAFrFAaNNl6TDloagprfMBUDNo')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) throw err;
                done();
            });
    });
});
