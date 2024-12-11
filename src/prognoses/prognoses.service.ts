import { Injectable } from "@nestjs/common";
import { GeminiAIService } from "../data/processor/ai/gemini-ai.service";
import { ScraperService } from "src/data/provider/scraper.service";

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
