import { Injectable } from "@nestjs/common";
import { Security } from "src/portfolios/dto/portfolio.dto";
import { ScraperService } from "src/prognoses/scraper/scraper.service";
import { GeminiAIService } from "./ai/gemini-ai.service";

@Injectable()
export class PrognosesService {
    constructor(
        private readonly scraperService: ScraperService,
        private readonly geminiAIService: GeminiAIService
    ) {}

    async makePrognosis(
        moneyAmount: number,
        endDate: Date,
        securitiesTickers: string[]
    ) {
        const bestDepositRates =
            await this.scraperService.getBestDepositRates();
        // Best securities sorted by sector (banki.ru)
        // Recommendations (banki.ru)

        //this.geminiAIService.
    }
}
