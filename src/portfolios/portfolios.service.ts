import { Injectable } from "@nestjs/common";
import { CreatePortfolioDto } from "./dto/create-portfolio.dto";
import { UpdatePortfolioDto } from "./dto/update-portfolio.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { PortfolioEntity } from "./entities/portfolio.entity";
import { Repository } from "typeorm";
import { GeminiAIService } from "src/data/processor/ai/gemini-ai.service";
import { SecurityEntity } from "src/securities/entities/security.entity";

@Injectable()
export class PortfoliosService {
    constructor(
        @InjectRepository(PortfolioEntity)
        private readonly portfolioRepository: Repository<PortfolioEntity>,
        private readonly geminiAIService: GeminiAIService
    ) {}

    async create(createPortfolioDto: CreatePortfolioDto) {
        const { securitiesIds, ...data } = createPortfolioDto;
        const portfolio = this.portfolioRepository.create(data);

        portfolio.securities = securitiesIds.map((id) => ({
            ...new SecurityEntity(),
            id
        }));

        console.log("portfolio: ", portfolio);

        return await this.portfolioRepository.(createPortfolioDto);
    }

    findAll() {
        return this.portfolioRepository.find();
    }

    findOne(id: number) {
        return this.portfolioRepository.findOneBy({ id });
    }

    update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
        return this.portfolioRepository.update(id, updatePortfolioDto);
    }

    remove(id: number) {
        return this.portfolioRepository.delete(id);
    }

    async findByUserId(userId: number) {
        return await this.portfolioRepository.find({ where: { userId } });
    }
}
