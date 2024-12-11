import { IsBoolean, IsNumber, IsString } from "class-validator";
import { SecurityEntity } from "../entities/security.entity";
import { SecurityCategories } from "../enums/security-categories.enum";

export class SecurityDto extends SecurityEntity {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    ticker: string;

    @IsString()
    category: SecurityCategories;

    @IsBoolean()
    isProfitable: boolean;

    @IsNumber()
    volatility: number;
}
