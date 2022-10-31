import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({ title: title, description: desc, price: price });
        const result = await newProduct.save(); // mongoose save function.
        console.log('REUSLT,', result);
        return result as object;
    }

    async getProducts() {
        const allProducts = await this.productModel.find().exec();
        const data = {
            message: "Data Found",
            success: true,
            data: allProducts.map((p) => (
                {
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    price: p.price
                }
            ))
        };
        return data;
    }

    async getSingleProduct(productId: string) {
        const product = await this.productModel.findOne({ _id: productId });
        const data = {
            success: true,
            message: "Product Found",
            data: {
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.price,
            }
        }
        return data;
    }

    async updateProduct(
        productId: string,
        title: string,
        desc: string,
        price: number,
    ) {
        const updatedProduct = await this.productModel.findOne({ _id: productId });
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        updatedProduct.save();
    }

    deleteProduct(productId: string) {
        this.productModel.findOneAndDelete({ _id: productId });
        const data = {
            success: true,
            message: "Product deleted"
        }
        return data as object;
    }
    
}