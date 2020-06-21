import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { ProductSchema } from './product.model';
import { MongooseModule } from '@nestjs/mongoose';

// import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
