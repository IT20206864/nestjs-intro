import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose'

export const ProductSchema = new mongoose.Schema({
    title: {type: String , required: true},
    description : { type : String , required: true},
    price : { type : Number },
    isDelete : { type : Number }
});

export class Product extends mongoose.Document {

    @ApiProperty()
     id:string ;

     @ApiProperty()
     title: string;

     @ApiProperty()
     description: string;
     
     @ApiProperty()
     price: number;

     @ApiProperty()
     isDelete: number;
}