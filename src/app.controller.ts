import { Controller, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { MoexApiService } from "./data/provider/moex-api.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post("aggregate-moex")
    aggregateMoexData() {
        return this.appService.forceUpdateMoexAggregatedData();
    }
}
