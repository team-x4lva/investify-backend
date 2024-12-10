import { IsDateString, IsNumber, ValidateNested } from "class-validator";
import { PortfolioDto } from "src/portfolios/dto/portfolio.dto";

export class GetPrognosisDto {
    @IsNumber()
    moneyAmount: number;

    @IsDateString()
    endDate: Date;

    @ValidateNested()
    portfolio: PortfolioDto;
}
