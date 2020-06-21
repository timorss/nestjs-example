import * as mongoose from 'mongoose'


export const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
})

// not mongoose
export interface Product extends mongoose.Document{
    _id: string;
    title: string;
    description: string;
    price: number;
}

