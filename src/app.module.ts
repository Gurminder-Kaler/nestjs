import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

const uri = 'mongodb+srv://gangwar0145:xxGTyguBt2EnatV5@cluster0.mmynjns.mongodb.net/nestjs?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(uri),
    ProductsModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
