import { Module } from "@nestjs/common";
import { PrognosesService } from "./prognoses.service";
import { PrognosesController } from "./prognoses.controller";
import { DataProcessorModule } from "src/data/processor/ai/data-processor.module";
import { DataProviderModule } from "src/data/provider/data-provider.module";

@Module({
    imports: [DataProcessorModule, DataProviderModule],
    providers: [PrognosesService],
    controllers: [PrognosesController]
})
export class PrognosesModule {}
