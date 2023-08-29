import chai from "chai";
import supertest from 'supertest';


const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("Testing de Sesiones Api Ecommerce", () => {
    
    
    describe("Test de registro y login de usuario", () => {

        before(function () {
            this.mockUser = {
                first_name: "Usuario01",
                last_name: "Apellido01",
                email: "correodeprueba@gmail.com",
                password: "123456"
            };
        });

        
        it("Test Registro Usuario: El usuario debe tener un registro correcto", async function () {
            

            //Then: 
            const {
                statusCode,
                ok,
                _body
            } = await requester.post('/api/sessions/register').send(this.mockUser);
            
            //Assert that:
            expect(statusCode).is.equal(201);

        });



        
        it("Test Login Usuario: Debe poder hacer login correctamente con el usuario registrado previamente.", async function () {
            
            const mockLogin = {
                email: this.mockUser.email,
                password: this.mockUser.password
            };


            //Then: 
            const result = await requester.post('/api/sessions/login').send(mockLogin);
            

            //Assert that:
            expect(result.statusCode).is.equal(200);
            expect(result.body).to.have.property('success');

        });
    
    
        it('Test logout de usuario: El usuario debe destruir su sesion', async function () {
        const 
        { statusCode, headers, body, ...rest } =
            await requester.get('/logout');

        expect(statusCode).to.be.equal(302);
        expect(headers).to.have.property('location', '/login');
        });

    })



})