import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { PortfolioEntity } from "../entities/portfolio.entity";
import { SecurityDto } from "src/securities/dto/security.dto";

export class PortfolioDto extends PortfolioEntity {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsNumber()
    userId: number;

    @IsArray()
    @ValidateNested({ each: true })
    securities: SecurityDto[];

    @IsArray()
    @IsNumber({}, { each: true })
    share: number[];
}
