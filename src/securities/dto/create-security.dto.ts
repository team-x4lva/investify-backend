import { OmitType } from "@nestjs/mapped-types";
import { SecurityDto } from "./security.dto";

export class CreateSecurityDto extends OmitType(SecurityDto, ["id"] as const) {}
