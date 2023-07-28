import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080/api/products');

describe('Tests de la ruta Products', async function () {

    before(function () {
        this.productID = null;
    });



    it('Test para crear producto: se debe crear un producto', async function () {

        const product = {
            "title": "producto01",
            "description": "Producto generado en el test",
            "code": "code01",
            "price": 11111,
            "stock": 11,
            "category": "category_test",
            "thumbnails": ["thumbnail1", "thumbnail2"]
        };

        const { statusCode, body } =
            await requester.post('/').send(product);
        
        this.productID = body._id;

        expect(statusCode).to.be.equal(201);
        expect(body).to.be.an('object').and.have.property('_id');
    });

    it('Test eliminar product: se debe eliminar el producto creado y tener la propiedad deletedCount.', async function () {

        const { statusCode, body } =
            await requester.delete(`/${this.productID}`);

        expect(statusCode).to.be.ok;
        expect(body).to.have.property('deletedCount');
        
    });
    it('Test de Mocking Product: Se debe tener un array con los productos mockeados', async function () {

        const { statusCode, body } = await requester.get('/mockingproducts');

        expect(statusCode).to.be.ok;
        expect(body.payload).to.have.lengthOf(100);
    });

});