import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Enable CORS with custom configuration
    // const corsOptions: CorsOptions = {
    //   origin: '*', // You can set specific origins or use '*' to allow any origin
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //   credentials: true, // Allow sending cookies and other credentials
    // };
  
    app.enableCors({
      // origin:'http://localhost:5000/createStream',
      // credentials:true
    })
  //validation pipe is used to validate user input
  //installed two packages as part of validation-> class-validator class-transformer
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,//to validate or remove unwanted properties 
    forbidNonWhitelisted:true,
  }))
  await app.listen(8000);
}
bootstrap();
