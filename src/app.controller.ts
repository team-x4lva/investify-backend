import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { MoexApiService } from "./data/provider/moex-api.service";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly moexApiService: MoexApiService
    ) {}

    @Get()
    getsdf() {
        this.moexApiService.updateSharesLocalData();

        return "Hello World!";
        //return this.moexApiService.calculateVolatility("shares");
    }
}
