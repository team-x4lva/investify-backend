import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtGuard } from "src/auth/guards/jwt.guard";

@Controller("users")
@UseGuards(JwtGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.usersService.findOne({ id: +id });
    }

    @Get(":id/portfolios")
    findPortfolios(@Param("id") id: string) {
        return this.usersService.findPortfolios(+id);
    }
}
