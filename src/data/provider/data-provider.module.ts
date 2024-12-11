import { Module } from "@nestjs/common";
import { ScraperService } from "./scraper.service";
import { MoexApiService } from "./moex-api.service";

@Module({
    providers: [ScraperService, MoexApiService],
    exports: [ScraperService, MoexApiService]
})
export class DataProviderModule {}
