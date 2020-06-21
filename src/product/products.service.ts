import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product.model'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }
    
    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({
            title,
            description: desc,
            price
        })
        const result = await newProduct.save()
        return result
    }

    async getProducts() {
        const products = await this.productModel.find().exec()
        return products as Product[]
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)
        return product
    }

    async updateProduct(productId: string, title: string, desc: string, price: number) {
        const updatedProduct = await this.findProduct(productId)
        if (title) {
            updatedProduct.title = title
        }
        if (desc) {
            updatedProduct.description = desc
        }
        if (price) {
            updatedProduct.price = price
        }
        return await updatedProduct.save()
    }

    async deleteProduct(productId: string) {

        const result = await this.productModel.deleteOne({ _id: productId }).exec()
        if (result.n === 0) {
            throw new NotFoundException('Could not find product.')
        }
        return productId
    }

    private async findProduct(id: String): Promise<Product> {
        try {
            const product = await this.productModel.findById(id).exec()
            if (!product) {
                throw new NotFoundException('Could not find product.')
            }
            return product;

        } catch (error) {
            throw new NotFoundException('Could not find product.')
        }
    }
}