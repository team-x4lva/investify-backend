import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete
} from "@nestjs/common";
import { PortfoliosService } from "./portfolios.service";
import { CreatePortfolioDto } from "./dto/create-portfolio.dto";
import { UpdatePortfolioDto } from "./dto/update-portfolio.dto";
import { GeneratePortfolioDto } from "./dto/generate-portfolio.dto";
import { GeminiAIService } from "src/data/processor/ai/gemini-ai.service";
import { SecuritiesService } from "src/securities/securities.service";

@Controller("portfolios")
export class PortfoliosController {
    constructor(
        private readonly portfoliosService: PortfoliosService,
        private readonly geminiAIService: GeminiAIService,
        private readonly securitiesService: SecuritiesService
    ) {}

    @Post()
    create(@Body() createPortfolioDto: CreatePortfolioDto) {
        return this.portfoliosService.create(createPortfolioDto);
    }

    @Get()
    findAll() {
        return this.portfoliosService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.portfoliosService.findOne(+id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updatePortfolioDto: UpdatePortfolioDto
    ) {
        return this.portfoliosService.update(+id, updatePortfolioDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.portfoliosService.remove(+id);
    }

    @Post("generate")
    async generatePortfolio(
        @Body() generatePortfolioDto: GeneratePortfolioDto
    ) {
        return this.geminiAIService.generatePortfolio({
            moneyAmount: generatePortfolioDto.moneyAmount,
            startDate: new Date(),
            endDate: generatePortfolioDto.endDate,
            desiredInstrumentsCategories:
                generatePortfolioDto.desiredInstrumentsCategories,
            volatility: generatePortfolioDto.volatility,
            dataset: await this.securitiesService.getProfitable()
        });
    }
}
