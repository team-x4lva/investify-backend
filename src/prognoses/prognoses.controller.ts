import { Controller } from "@nestjs/common";
import { ScrapperService } from "src/scrapper/scrapper.service";
import { PrognosesService } from "./prognoses.service";

@Controller("prognoses")
export class PrognosesController {
    constructor(private readonly prognosesService: PrognosesService) {}

    getPrognosis() {}
}
