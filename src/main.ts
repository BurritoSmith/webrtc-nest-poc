import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  app.setGlobalPrefix('apiv1');

  app.enableCors({
    "origin": [
      "https://localhost:4200",
      "https://codepro-tv-angular-webrtc-poc-dot-codepro-tv-project.ue.r.appspot.com"
    ],
    "methods":"GET,HEAD,PUT,PATCH,POST,DELETE",
    "credentials": true
  });
  await app.listen(port);
}
bootstrap();