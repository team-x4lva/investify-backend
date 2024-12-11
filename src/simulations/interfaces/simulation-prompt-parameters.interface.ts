import { SecurityDto } from "src/securities/dto/security.dto";

export interface PortfolioItem {
    security: SecurityDto;
    share: number;
}

export interface SimulationPromptParameters {
    moneyAmount?: number;
    startDate: Date;
    endDate: Date;
    portfolio: PortfolioItem[];
}
