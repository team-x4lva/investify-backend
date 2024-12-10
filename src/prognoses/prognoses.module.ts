import { Module } from "@nestjs/common";
import { PrognosesService } from "./prognoses.service";
import { PrognosesController } from "./prognoses.controller";

@Module({
    providers: [PrognosesService],
    controllers: [PrognosesController]
})
export class PrognosesModule {}
