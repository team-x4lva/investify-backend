export interface GeneratePortfolioPromptParameters {
    moneyAmount: number;
    startDate: Date;
    endDate: Date;
    desiredInstrumentsCategories: string[];
    volatility: number;
    dataset: string;
    articles: string;
}
