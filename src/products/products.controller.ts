import { Controller, Post , Body , Get , Param , Patch, Delete} from "@nestjs/common";
import { ApiBody, ApiCreatedResponse } from "@nestjs/swagger";
import { title } from "process";
import { Product } from "./product.model";
import { ProductsService } from "./products.service";
import { CreateProductDto  } from "./dto/create-product-dto";
import { UpdateProductDto } from "./dto/update-product-dto";
import { BaseProductDto } from "./dto/base-product-dto";

@Controller('products')
export class ProductsController {
    constructor(private readonly productService : ProductsService) {}

    // Inserting a product
    @Post()
    @ApiCreatedResponse({description: 'Product Addition'})
    @ApiBody({type : BaseProductDto})
    async addProduct( @Body() createProductTodo : CreateProductDto ) {
        const product = await this.productService.insertProduct( createProductTodo );
        return product;
    }

    // Fetching all products
    @Get()
    @ApiCreatedResponse({description : 'Getting all products'})
    async getAllProducts() {
        const products = await this.productService.getProducts();
        return products;
    }

    // Fethcing a single product by id
    @Get(':id')
    @ApiCreatedResponse({description : 'Getting a single product'})
    async getProduct(@Param('id') prodId : string) {
        const product = await this.productService.getSingleProduct(prodId);
        return product;
    }

    // Updating a single product by id
    @Patch(':id')
    @ApiCreatedResponse({description:'Updating a single product'})
    @ApiBody({ type : BaseProductDto })
    async updateProduct(
        @Param('id') prodId : string ,
        @Body() updateProductTodo : UpdateProductDto
        ) {
        await this.productService.updateProduct(prodId , updateProductTodo);
        return null;
    }

    // Deleting a single product by id
    @Delete(':id')
    @ApiCreatedResponse({description:'Deleting a product'})
    async removeProduct(@Param('id') prodId : string){
        await this.productService.deleteProduct(prodId);
        return null;
    }

    // Soft Deleting a product
    @Patch('softDelete/:id')
    @ApiCreatedResponse({description:'Soft deleting a product'})
    async softDelete(@Param('id') prodId : string ){
        await this.productService.softDelete(prodId);
        return null;
    }
}