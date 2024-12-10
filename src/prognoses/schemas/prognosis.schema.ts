import { Schema, SchemaType } from "@google/generative-ai";

export const getPrognosisSchema: Schema = {
    description: "",
    type: SchemaType.ARRAY,
    items: {
        type: SchemaType.OBJECT,
        properties: {
            advice: {
                type: SchemaType.STRING,
                description: "",
                nullable: false
            }
        },
        required: []
    }
};
