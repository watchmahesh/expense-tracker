import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from "morgan";
import * as momenttz from "moment-timezone";
import { Any } from 'typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix("api/v1");

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // LOGGING
  morgan.token("date", (req, res, tz) => {
    const timezone = String(tz);

    return momenttz().tz(timezone).format("MMMM DD, YYYY hh:mm:ssA");
  });

  morgan.token("level", (req, res) => {
    if (res.statusCode < 600 && res.statusCode > 399) {
      return "[ERROR]";
    } else if (res.statusCode < 400) {
      return "[INFO]";
    } else {
      return "[FATAL]";
    }
  });

  morgan.format(
    "response-logs-format",
    ":date[Asia/Katmandu] :level :method :url :status - :response-time ms"
  );

  app.use(morgan("response-logs-format"));

  await app.listen(3000);
  console.log(`App running on ${process.env.PORT}`);

}
bootstrap();
