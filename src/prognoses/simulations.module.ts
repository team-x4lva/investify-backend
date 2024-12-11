import { Module } from "@nestjs/common";
import { SimulationsService } from "./simulations.service";
import { SimulationsController } from "./simulations.controller";
import { DataProcessorModule } from "src/data/processor/ai/data-processor.module";
import { DataProviderModule } from "src/data/provider/data-provider.module";

@Module({
    imports: [DataProcessorModule, DataProviderModule],
    providers: [SimulationsService],
    controllers: [SimulationsController]
})
export class SimulationsModule {}
