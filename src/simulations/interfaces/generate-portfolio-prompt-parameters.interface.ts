import { SecurityEntity } from "src/securities/entities/security.entity";

export interface GeneratePortfolioPromptParameters {
    moneyAmount: number;
    startDate: Date;
    endDate: Date;
    desiredInstrumentsCategories: string[];
    volatility: number;
    dataset: SecurityEntity[];
}
