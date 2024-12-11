import { Injectable } from "@nestjs/common";
import { GeminiAIService } from "../data/processor/ai/gemini-ai.service";
import { ScraperService } from "src/data/provider/scraper.service";

@Injectable()
export class SimulationsService {
    constructor(
        private readonly scraperService: ScraperService,
        private readonly geminiAIService: GeminiAIService
    ) {}

    async conductSimulation(
        moneyAmount: number,
        endDate: Date,
        portfolioId: number
    ) {
        const bestDepositRates =
            await this.scraperService.getBestDepositRates();

        //this.geminiAIService.();

        return {
            bestDepositRates
        };
    }
}
