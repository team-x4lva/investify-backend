import { Module } from "@nestjs/common";
import { PrognosesService } from "./prognoses.service";
import { PrognosesController } from "./prognoses.controller";
import { GeminiAIService } from "./providers/gemini-ai.service";
import { ScraperService } from "./scraper/scraper.service";

@Module({
    providers: [PrognosesService, GeminiAIService, ScraperService],
    controllers: [PrognosesController]
})
export class PrognosesModule {}
