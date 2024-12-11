import { Module } from "@nestjs/common";
import { ScraperService } from "./scraper.service";
import { MoexApiService } from "./moex-api.service";
import { SecuritiesModule } from "src/securities/securities.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
    imports: [SecuritiesModule,
        ScheduleModule.forRoot()
    ],
    providers: [ScraperService, MoexApiService],
    exports: [ScraperService, MoexApiService]
})
export class DataProviderModule {}
