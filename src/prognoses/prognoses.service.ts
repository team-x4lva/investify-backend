import { Injectable } from "@nestjs/common";
import { ScrapperService } from "src/scrapper/scrapper.service";

@Injectable()
export class PrognosesService {
    constructor(private readonly scraperService: ScrapperService) {}

    makePrognosis() {
        const bestDepositRates = this.scraperService.getBestDepositRates();
        // Best securities sorted by sector (banki.ru)
        // Recommendations (banki.ru)
    }
}
