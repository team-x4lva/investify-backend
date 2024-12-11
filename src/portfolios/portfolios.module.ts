import { Module } from "@nestjs/common";
import { PortfoliosService } from "./portfolios.service";
import { PortfoliosController } from "./portfolios.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PortfolioEntity } from "./entities/portfolio.entity";
import { DataProcessorModule } from "src/data/processor/ai/data-processor.module";
import { SecuritiesModule } from "src/securities/securities.module";
import { DataProviderModule } from "src/data/provider/data-provider.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([PortfolioEntity]),
        DataProviderModule,
        DataProcessorModule,
        SecuritiesModule
    ],
    controllers: [PortfoliosController],
    providers: [PortfoliosService],
    exports: [PortfoliosService]
})
export class PortfoliosModule {}
