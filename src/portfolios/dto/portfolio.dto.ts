import { IsArray, IsNumber, IsString } from "class-validator";
import { PortfolioEntity } from "../entities/portfolio.entity";

export class PortfolioDto extends PortfolioEntity {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsNumber()
    userId: number;

    @IsArray()
    @IsNumber({}, { each: true })
    securitiesIds: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    share: number[];
}
