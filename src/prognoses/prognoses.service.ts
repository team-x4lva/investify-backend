import { Injectable } from "@nestjs/common";
import { ScraperService } from "src/scraper/scraper.service";

@Injectable()
export class PrognosesService {
    constructor(private readonly scraperService: ScraperService) {}

    makePrognosis() {
        const bestDepositRates = this.scraperService.getBestDepositRates();
        // Best securities sorted by sector (banki.ru)
        // Recommendations (banki.ru)
    }
}
