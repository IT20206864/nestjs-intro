import { ApiProperty } from "@nestjs/swagger"

export class BaseProductDto {
    
    @ApiProperty()
    title : string
    @ApiProperty()
    description : string
    @ApiProperty()
    price : number
}