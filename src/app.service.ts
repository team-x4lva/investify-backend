import { Injectable } from "@nestjs/common";
import { MoexApiService } from "./data/provider/moex-api.service";
import { ScraperService } from './data/provider/scraper.service';

@Injectable()
export class AppService {
    constructor(private readonly moexApiService: MoexApiService
    ) {}

    forceUpdateMoexAggregatedData() {
        this.moexApiService.updateSharesLocalData();
        this.moexApiService.updateBondsLocalData();
        //return this.moexApiService.calculateVolatility("shares");

        return true;
    }
}
