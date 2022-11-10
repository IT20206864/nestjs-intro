import { Injectable , NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { InjectModel } from "@nestjs/mongoose/dist/common";
import { Model } from "mongoose";
import { CreateProductDto } from "./dto/create-product-dto";
import { UpdateProductDto } from "./dto/update-product-dto";
@Injectable()
export class ProductsService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {} // To Inject Module

        // Insert Product
        async insertProduct(createProductTodo : CreateProductDto){
            const newProduct = new this.productModel({
                ...createProductTodo,
                isDelete : 0
            });
            return await newProduct.save();
        }

        // Get All Products
        async getProducts() {
            return await this.productModel.find({ isDelete : 0 }).exec();
        }

        // Get Single Product
        async getSingleProduct( productId: string ) {
            const product = await this.findProduct(productId)
            return product;
        }

        // Update a product
        async updateProduct(productId : string , updateProductTodo : UpdateProductDto ) {
            return await this.productModel.findByIdAndUpdate(productId , updateProductTodo)      
        }
        
        // Delete a product
        async deleteProduct(prodId: string){
            return await this.productModel.deleteOne({ id:prodId }).exec();
        }

        // Soft Delete a product
        async softDelete(prodId: string) {
            return await this.productModel.findByIdAndUpdate({ _id: prodId } , { isDelete : 1 })
        }

        // Util to find a product
        private async findProduct(id: string) : Promise<Product>{
            let product
            try{
                product = await this.productModel.find({ _id : id  , isDelete : 0 }).exec();
            }
            catch(error) {
                throw new NotFoundException('Could not find product.');
            }
            return product;
        }

}