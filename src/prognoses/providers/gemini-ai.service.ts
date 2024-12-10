import { GoogleGenerativeAI } from "@google/generative-ai";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GeminiAIService {
    constructor(private readonly configService: ConfigService) {}

    private readonly ai = new GoogleGenerativeAI(
        this.configService.get<string>("GEMINI_API_KEY")
    );
    private readonly model = this.ai.getGenerativeModel({
        model: this.configService.get<string>("GEMINI_MODEL"),
        generationConfig: {
            responseMimeType: "application/json"
        }
    });

    async getAIPrognosis() {
        const prompt: string = ""; //this.formatPrompt(GET_PROGNOSIS_PROMPT, {});

        const result = await this.model.generateContent(prompt);

        return JSON.parse(result.response.text());
    }

    private formatPrompt<T>(template: string, values: T) {
        return template.replaceAll(
            /{(w+)}/g,
            (match, key) => values[key] || match
        );
    }
}
