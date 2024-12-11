import { IsDateString, IsNumber } from "class-validator";

export class ConductSimulationDto {
    @IsNumber()
    moneyAmount: number;

    @IsDateString()
    endDate: Date;

    @IsNumber()
    portfolioId: number;
}
