import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { PortfolioEntity } from "../entities/portfolio.entity";

export class Security {
    @IsString()
    name: string;

    @IsNumber()
    share: number;
}

export class PortfolioDto extends PortfolioEntity {
    @IsArray()
    @ValidateNested({ each: true })
    securities: Security[];
}
