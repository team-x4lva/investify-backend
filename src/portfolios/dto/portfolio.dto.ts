import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

class Security {
    @IsString()
    name: string;

    @IsNumber()
    share: number;
}

export class PortfolioDto {
    @IsArray()
    @ValidateNested({ each: true })
    securities: Security[];
}
