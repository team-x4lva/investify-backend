import { OmitType } from "@nestjs/mapped-types";
import { PortfolioDto } from "./portfolio.dto";

export class CreatePortfolioDto extends OmitType(PortfolioDto, [
    "id"
] as const) {}
