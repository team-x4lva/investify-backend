import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ScraperService } from "./prognoses/scraper/scraper.service";
import { PrognosesModule } from "./prognoses/prognoses.module";
import { PrognosesController } from "./prognoses/prognoses.controller";
import { ConfigModule } from "@nestjs/config";
import { PortfoliosModule } from './portfolios/portfolios.module';
import * as Joi from "joi";

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                PORT: Joi.number().port().default(3000),
                GEMINI_API_KEY: Joi.string().required(),
                GEMINI_MODEL: Joi.string().default("gemini-1.5-pro")
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
