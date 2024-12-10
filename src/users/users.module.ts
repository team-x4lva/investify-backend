import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { PortfoliosModule } from "src/portfolios/portfolios.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule,
        PortfoliosModule
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
