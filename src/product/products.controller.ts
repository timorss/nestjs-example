import { Controller, Post, Body, Get, Param, Patch, Delete, Req } from "@nestjs/common";
import { ProductService } from './products.service'
import { Request } from "express";

@Controller('products')
export class ProductController {
    constructor(private readonly productsService: ProductService) {

    }

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        const createdProduct = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice)
        return createdProduct
    }

    @Get()
    getAllProducts(@Req() request: Request) {
        // console.log('request', Object.keys(request));
        // console.log('request.params', request.params);

        const products = this.productsService.getProducts()
        return products
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId)
    }

    @Patch(':id')
    updateProduct(@Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        return this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string) {
        return this.productsService.deleteProduct(prodId)
    }

}