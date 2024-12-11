import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { MoexApiService } from "./data/provider/moex-api.service";
import { Public } from "./constants/constants";

@Public()
@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly moexApiService: MoexApiService,
    ) {}

    @Get()
    getsdf () {
        return this.moexApiService.calculateVolatility("shares");
    }
}
