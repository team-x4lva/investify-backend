import { Schema, SchemaType } from "@google/generative-ai";

export const portfolioSchema: Schema = {
    description:
        "Structured investment portfolio tailored to a selected strategy and user preferences.",
    type: SchemaType.OBJECT,
    properties: {
        generatedPortfolio: {
            type: SchemaType.OBJECT,
            description:
                "Generated portfolio based on user preferences and strategy.",
            properties: {
                strategy: {
                    type: SchemaType.STRING,
                    description:
                        "The investment strategy applied to generate this portfolio.",
                    nullable: false
                },
                allocation: {
                    type: SchemaType.ARRAY,
                    description:
                        "Breakdown of asset categories and their respective percentage allocations.",
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            category: {
                                type: SchemaType.STRING,
                                description:
                                    "Asset category: Stocks, Bonds, Currency, Commodity, etc.",
                                nullable: false
                            },
                            percentage: {
                                type: SchemaType.NUMBER,
                                description:
                                    "Allocation (share) to the given category, between 0 and 1 (with 2 decimal places).",
                                nullable: false
                            },
                            instruments: {
                                type: SchemaType.ARRAY,
                                description:
                                    "List of specific instruments or tickers within this category.",
                                items: {
                                    type: SchemaType.OBJECT,
                                    description:
                                        "Information on the concrete investment instrument.",
                                    nullable: false,
                                    properties: {
                                        id: {
                                            type: SchemaType.NUMBER,
                                            nullable: false,
                                            description:
                                                "Id of the investing instrument"
                                        },
                                        name: {
                                            type: SchemaType.STRING,
                                            nullable: false,
                                            description:
                                                "Name of the investing instrument"
                                        },
                                        percentage: {
                                            type: SchemaType.NUMBER,
                                            description:
                                                "Allocation (share) to the given investing instrument (!) in its category, between 0 and 1 (with 2 decimal places).",
                                            nullable: false
                                        }
                                    }
                                }
                            }
                        },
                        required: ["category", "percentage", "instruments"]
                    },
                    nullable: false
                },
                rationale: {
                    type: SchemaType.STRING,
                    description:
                        "Short description of the rationale behind the allocation decisions.",
                    nullable: false
                }
            },
            required: ["strategy", "allocation", "rationale"]
        }
    },
    required: ["generatedPortfolio"]
};
