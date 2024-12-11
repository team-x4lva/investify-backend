import { Module } from "@nestjs/common";
import { SecuritiesService } from "./securities.service";
import { SecuritiesController } from "./securities.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SecurityEntity } from "./entities/security.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SecurityEntity])],
    controllers: [SecuritiesController],
    providers: [SecuritiesService],
    exports: [SecuritiesService],
})
export class SecuritiesModule {}
