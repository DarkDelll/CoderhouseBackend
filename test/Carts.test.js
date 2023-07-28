import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080/api/carts');

describe('Tests de la ruta de Carts', async function () {

    before(function () {
        this.cartID = null;
    });

    it('Test para crear carrito: se debe crear un carrito', async function () {

        const { statusCode, body } = await requester.post('/');

        expect(statusCode).to.be.equal(201);
        this.cartID = body._id;
    })

    it('Test para agregar producto al carrito: se agregará un producto inexistente por lo que se espera error', async function () {

        const { statusCode, body } = await requester.post(`/${this.cartID}/product/1111111`);

        expect(statusCode).to.be.equal(500);
        expect(body).to.have.property('error');
        
    })

})