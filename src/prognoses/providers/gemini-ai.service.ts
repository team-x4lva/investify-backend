import { Injectable } from "@nestjs/common";

@Injectable()
export class GeminiAIService {
    private readonly ai = new GoogleGenerativeAI(
        this.configService.get<string>("ai.geminiApiKey")
    );
    private readonly model = this.ai.getGenerativeModel({
        model: this.configService.get<string>("ai.geminiModel"),
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: diseaseImageSchema
        }
    });
}
