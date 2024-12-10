import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrognosesModule } from "./prognoses/prognoses.module";
import { PrognosesController } from "./prognoses/prognoses.controller";
import { ConfigModule } from "@nestjs/config";
import { PortfoliosModule } from "./portfolios/portfolios.module";
import * as Joi from "joi";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                PORT: Joi.number().port().default(3000),
                GEMINI_API_KEY: Joi.string().required(),
                GEMINI_MODEL: Joi.string().default("gemini-1.5-pro"),
                POSTGRES_HOST: Joi.string().hostname(),
                POSTGRES_PORT: Joi.number().port().default(5432),
                POSTGRES_PASSWORD: Joi.string(),
                POSTGRES_USER: Joi.string(),
                POSTGRES_DB: Joi.string()
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true
            },
            isGlobal: true
        }),
        PrognosesModule,
        PortfoliosModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
