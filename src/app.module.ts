import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrognosesModule } from "./prognoses/prognoses.module";

@Module({
    imports: [
        ConfigModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
