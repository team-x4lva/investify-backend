import { Body, Controller, Post } from "@nestjs/common";
import { PrognosesService } from "./prognoses.service";
import { ConductSimulationDto } from "./dto/conduct-simulation.dto";

@Controller("prognoses")
export class PrognosesController {
    constructor(private readonly prognosesService: PrognosesService) {}

    @Post()
    conductSimulation(@Body() conductSimulationDto: ConductSimulationDto) {
        return this.prognosesService.makePrognosis(
            conductSimulationDto.moneyAmount,
            conductSimulationDto.endDate,
            conductSimulationDto.portfolio.securities
        );
    }
}
