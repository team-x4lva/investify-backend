import { SecurityDto } from "src/securities/dto/security.dto";

export interface SimulationPromptParameters {
    moneyAmount?: number;
    startDate: Date;
    endDate: Date;
    portfolio: SecurityDto[];
}
