import { IsBoolean, IsNumber, IsString } from "class-validator";
import { SecurityEntity } from "../entities/security.entity";

export class SecurityDto extends SecurityEntity {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    ticker: string;

    @IsBoolean()
    isProfitable: boolean;

    @IsNumber()
    volatility: number;
}
