import { IsNumber } from "class-validator";

export class GetPrognosisDto {
    @IsNumber()
    moneyAmount: number;
}
