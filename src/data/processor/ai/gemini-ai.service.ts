import { GoogleGenerativeAI } from "@google/generative-ai";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { portfolioSchema } from "../../../simulations/schemas/portfolio.schema";
import { GeneratePortfolioPromptParameters } from "../../../simulations/interfaces/generate-portfolio-prompt-parameters.interface";
import {
    GENERATE_PORTFOLIO_PROMPT,
    GET_SIMULATION_PROMPT
} from "src/constants/constants";
import { simulationSchema } from "src/simulations/schemas/simulation.schema";
import { SimulationPromptParameters } from "src/simulations/interfaces/simulation-prompt-parameters.interface";

@Injectable()
export class GeminiAIService {
    constructor(private readonly configService: ConfigService) {}

    private readonly ai = new GoogleGenerativeAI(
        this.configService.get<string>("GEMINI_API_KEY")
    );
    private readonly portfolioModel = this.ai.getGenerativeModel({
        model: this.configService.get<string>("GEMINI_MODEL"),
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: portfolioSchema
        }
    });
    private readonly simulationModel = this.ai.getGenerativeModel({
        model: this.configService.get<string>("GEMINI_MODEL"),
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: simulationSchema
        }
    });

    async generatePortfolio(parameters: GeneratePortfolioPromptParameters) {
        const prompt: string =
            this.formatPrompt<GeneratePortfolioPromptParameters>(
                GENERATE_PORTFOLIO_PROMPT,
                parameters
            );

        console.log(prompt);

        const result = await this.portfolioModel.generateContent(prompt);

        return JSON.parse(result.response.text());
    }

    async generateSimulation(parameters: SimulationPromptParameters) {
        const prompt: string = this.formatPrompt<SimulationPromptParameters>(
            GET_SIMULATION_PROMPT,
            parameters
        );

        const result = await this.simulationModel.generateContent(prompt);

        return JSON.parse(result.response.text());
    }

    private formatPrompt<T>(template: string, values: T) {
        return template.replace(/{([a-zA-Z]+)}/g, (match, key) =>
            values[key] !== undefined ? values[key] : match
        );
    }
}
