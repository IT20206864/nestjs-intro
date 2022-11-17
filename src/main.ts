import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { userInfo } from 'os';
import { AppModule } from './app.module';
const cors = require("cors");
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('Sample Product API')
  .setDescription('APIs for Product CRUD')
  .setVersion('1.0.0')
  .build();

  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api' , app , document );
  app.use(cors());
  await app.listen(3000);
}
bootstrap();
