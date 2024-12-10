import { Module } from "@nestjs/common";
import { PortfoliosService } from "./portfolios.service";
import { PortfoliosController } from "./portfolios.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PortfolioEntity } from "./entities/portfolio.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PortfolioEntity])],
    controllers: [PortfoliosController],
    providers: [PortfoliosService],
    exports: [PortfoliosService]
})
export class PortfoliosModule {}
