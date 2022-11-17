import { Test } from "@nestjs/testing";
import { INestApplication } from '@nestjs/common';
const testConfig = require('./testConfig');
import * as request from 'supertest';
import { AppModule } from "../app.module";

describe('Product Routes' , () =>{

    let app : INestApplication;
    let productsService = { findAll: () => ['test']}
    let id;
    beforeEach(async () =>{
        const module = await Test.createTestingModule({
            imports: [AppModule],
        })
        .overrideProvider(productsService)
        .useValue(productsService)
        .compile();

        app = module.createNestApplication();
        await app.init();
    });

    describe('POST /product test' ,  function(){
        it('Should return 201 status when product succesfully added' , async () =>{
            const response = await request(app.getHttpServer()).post('/products').send({
                title: "Television",
                price: 4000,
                description: "Good Quality 4K UHD"
            })
            expect(response.statusCode).toBe(201);
            // Save id
            id = response.body._id;
          
        })
    });

    describe('GET /product Test' , function() {
        it('Should return a 200 status when fetched succesfully' , async() =>{
            const response = await request(app.getHttpServer()).get('/products');
            expect(response.statusCode).toBe(200);
      
        })
    })

    describe('GET /product/{id} Test' , function() {
        it('Should return a 200 status when product fetched ' , async() =>{
            const response = await request(app.getHttpServer()).get(`/products/${id}`);
            expect(response.statusCode).toBe(200);
     
        })
    })

    describe('PATCH /product/{id} Test' , function() {
        it('Should return a 200 status when product succesfully updated ' , async() =>{
            const response =  await request(app.getHttpServer()).patch(`/products/${id}`).send({
                title: "Samsung TV",
                price: 5000,
                description: "Samsung TV 4K UHD"
            });
            expect(response.statusCode).toBe(200);
  
        });
    })

    describe('DELETE /products/softDelete/{id}' , function() {
        it('Should return a 200 status when a product is succesfully soft deleted' , async() =>{
            const response = await request(app.getHttpServer()).patch(`/products/softDelete/${id}`);
            expect(response.statusCode).toBe(200)
        })
    })

    describe('DELETE /product/{id} Test' , function() {
        it('Should return a 200 status when product succesfully hard deleted' , async() =>{
            const response = await request(app.getHttpServer()).delete(`/products/${id}`);
            expect(response.statusCode).toBe(200);
      
        })
    })

})

// describe('Product Controller' , () =>{
//     let productController: ProductsController;
//     let productService: ProductsService;

//     beforeEach(async () =>{
//         const module = await Test.createTestingModule({
//             controllers: [ProductsController],
//             providers: [ProductsService],
//         }).compile();

//         productController = module.get<ProductsController>(ProductsController);
//         productService = module.get<ProductsService>(ProductsService);
//     });

//     describe('Find All' , () =>{
//         it('Should return an array of product objects', async () =>{
//             const result = ['test'];
//             jest.spyOn(productService , 'getProducts').mockImplementation(() => result);

//             expect(await productController.getAllProducts()).toBe(result);
//         })
//     })
// })




// describe('POST /product Test',function (){
//     this.timeout(5000);
//     it('Should check if POST works /product returns 200 status when valid information is provided' , (done) =>{
//         testConfig.server
//         .init()
//         .then((serverInstance) =>{
//             return serverInstance.inject(
//                 {
//                     method: 'POST',
//                     url: '/products',
//                     headers: {
//                         'Content-Type':'application/json'
//                     },
//                     payLoad: testConfig.data.products
//                 }
//             )
//         }).then((response) =>{
//             assert.equal(response.statusCode , 200);
//             assert.property(response.result , 'message');
//             assert.property(response.result , '_id');
//             done();

//         });
//     });
// });
   
// describe('GET /products Test' , function () {
//     it('Should check if GET /products returns a 200 status' , (done) =>{
//         testConfig.server
//         .init()
//         .then((serverInstance) =>{
//             return serverInstance.inject(
//                 {
//                     method: 'GET',
//                     url: '/products',
//                     headers: {
//                         'Content-Type':'application/json'
//                     }
//                 }
//             )
//         }).then((response) =>{
//             assert.equal(response.statusCode, 200);
//             done();
//         });
//     });
// });

// describe('GET /products/{id} Test' , function () {
//     this.timeout(testConfig.testTimeout);
//     it('Should return a single product with status code 200' , (done) =>{
//         testConfig.server.init()
//         .then((serverInstance) =>{
//             return serverInstance.inject(
//                 {
//                     method: 'GET',
//                     url: `/products/${testConfig.products._id}`
//                 }
//             )
//         }).then((response) =>{
//             assert.equal(response.statusCode , 200);
//             done();
//         });
//     });
// });

// describe('PATCH /products/{id} Test' , function() {
//     this.timeout(testConfig.testTimeout);
//     it('Should check if PATCH /products/{id} returns 200 status when updation occurs' , (done) =>{
//         testConfig.server
//         .init()
//         .then((serverInstance) =>{
//             return serverInstance.inject(
//                 {
//                     method: 'PATCH',
//                     url: `/products/${testConfig.data.products._id}`

//                 }
//             )
//         }).then((response) =>{
//             assert.equal(response.statusCode , 200);
//             done();
//         })
//     })
// });

// describe('DELETE /products/{id} Test' , function() {
//     this.timeout(testConfig.testTimeout);
//     it('Should check if DELETE /products/{id} returns 200 status code when deleted', (done) =>{
//         testConfig.server
//         .init()
//         .then((serverInstance) =>{
//             return serverInstance.inject({
//                 method: 'DELETE',
//                 url: `/products/${testConfig.data.products._id}`
//             });
//         }).then((response) =>{
//             assert.equal(response.statusCode , 200);
//             done();
//         })
//     })
// })







