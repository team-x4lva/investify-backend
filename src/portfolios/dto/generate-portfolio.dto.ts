import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsDateString,
    IsNumber,
    IsString,
    Max,
    Min
} from "class-validator";

export class GeneratePortfolioDto {
    @IsNumber()
    moneyAmount: number;

    @IsDateString()
    endDate: Date;

    @IsNumber()
    @Min(0)
    @Max(1)
    volatility: number;

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    desiredInstrumentsCategories: string[];
}
