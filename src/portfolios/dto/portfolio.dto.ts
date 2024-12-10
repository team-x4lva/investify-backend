import { IsArray, IsNumber, IsString, Length } from "class-validator";
import { PortfolioEntity } from "../entities/portfolio.entity";

export class Security {
    @IsString()
    name: string;

    @IsNumber()
    share: number;
}

export class PortfolioDto extends PortfolioEntity {
    @IsNumber()
    userId: number;

    // @IsArray()
    // @ValidateNested({ each: true })
    // securities: Security[];

    @IsArray()
    @IsString({ each: true })
    @Length(1, 15, { each: true })
    securitiesTickers: string[];
}
