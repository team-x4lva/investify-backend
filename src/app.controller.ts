import { Controller, Post, Get } from "@nestjs/common";
import { AppService } from "./app.service";
@Controller()
export class AppController {
    constructor(private readonly appService: AppService
    ) {}

    @Post("aggregate-moex")
    aggregateMoexData() {
        return this.appService.forceUpdateMoexAggregatedData();
    }
}
