import { Injectable } from "@nestjs/common";
import { GeminiAIService } from "../data/processor/ai/gemini-ai.service";
import { ScraperService } from "src/data/provider/scraper.service";
import {
    PortfolioItem,
    SimulationPromptParameters
} from "./interfaces/simulation-prompt-parameters.interface";
import { PortfoliosService } from "../portfolios/portfolios.service";

@Injectable()
export class SimulationsService {
    constructor(
        private readonly scraperService: ScraperService,
        private readonly geminiAIService: GeminiAIService,
        private readonly portfoliosService: PortfoliosService
    ) {}

    async conductSimulation(
        moneyAmount: number,
        endDate: Date,
        portfolioId: number
    ) {
        const portfolio = await this.portfoliosService.findOne(portfolioId);
        const items: PortfolioItem[] = [];
        for (let i = 0; i < portfolio.securities.length; i++) {
            items.push({
                security: portfolio.securities[i],
                share: portfolio.share[i]
            });
        }
        const bestDepositRates =
            await this.scraperService.getBestDepositRates();

        const promptParameters: SimulationPromptParameters = {
            moneyAmount: moneyAmount,
            startDate: new Date(),
            endDate: endDate,
            portfolio: items
        };
        const result =
            await this.geminiAIService.generateSimulation(promptParameters);

        return {
            bestDepositRates,
            result
        };
    }
}
