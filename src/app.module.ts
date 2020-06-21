import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/products.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://timorss:mkhyef777@cluster0-shu8j.mongodb.net/nestjs-demo?retryWrites=true&w=majority'),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
