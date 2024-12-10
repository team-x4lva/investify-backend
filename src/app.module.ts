import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrognosesModule } from "./prognoses/prognoses.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UserEntity } from "./users/entities/user.entity";

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
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                type: "postgres",
                host: configService.getOrThrow<string>("POSTGRES_HOST"),
                port: +configService.getOrThrow<string>("POSTGRES_PORT"),
                username: configService.getOrThrow<string>("POSTGRES_USER"),
                password: configService.getOrThrow<string>("POSTGRES_PASSWORD"),
                database: configService.getOrThrow<string>("POSTGRES_DB"),
                entities: [UserEntity],
                synchronize: true
            }),
            inject: [ConfigService]
        }),
        PrognosesModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
