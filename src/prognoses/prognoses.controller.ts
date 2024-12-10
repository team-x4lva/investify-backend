import { Controller } from "@nestjs/common";
import { ScraperService } from "src/scraper/scraper.service";
import { PrognosesService } from "./prognoses.service";

@Controller("prognoses")
export class PrognosesController {
    constructor(private readonly prognosesService: PrognosesService) {}

    getPrognosis() {}
}
