import { Body, Controller, Post } from "@nestjs/common";
import { SimulationsService } from "./simulations.service";
import { ConductSimulationDto } from "./dto/conduct-simulation.dto";

@Controller("simulations")
export class SimulationsController {
    constructor(private readonly simulationsServices: SimulationsService) {}

    @Post()
    conductSimulation(@Body() conductSimulationDto: ConductSimulationDto) {
        return this.simulationsServices.conductSimulation(
            conductSimulationDto.moneyAmount,
            conductSimulationDto.endDate,
            conductSimulationDto.portfolio.securitiesTickers
        );
    }
}
