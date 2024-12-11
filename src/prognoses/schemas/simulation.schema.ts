import { Schema, SchemaType } from "@google/generative-ai";

export const getSimulationSchema: Schema = {
    description: "Financial forecast and investment recommendations.",
    type: SchemaType.OBJECT,
    properties: {
        forecast: {
            type: SchemaType.OBJECT,
            description: "Forecasted asset returns and portfolio performance.",
            properties: {
                asset_returns: {
                    type: SchemaType.OBJECT,
                    description: "Expected returns for each asset class.",
                    properties: {
                        stocks: {
                            type: SchemaType.NUMBER,
                            description: "Expected return for stocks."
                        },
                        bonds: {
                            type: SchemaType.NUMBER,
                            description: "Expected return for bonds."
                        },
                        currency: {
                            type: SchemaType.NUMBER,
                            description: "Expected return for currency."
                        },
                        gold: {
                            type: SchemaType.NUMBER,
                            description: "Expected return for gold."
                        }
                    }
                },
                portfolio_return: {
                    type: SchemaType.NUMBER,
                    description: "Overall expected portfolio return."
                },
                timeline_projection: {
                    type: SchemaType.ARRAY,
                    description: "Projected portfolio returns over time.",
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            month: {
                                type: SchemaType.NUMBER,
                                description: "Month of the projection."
                            },
                            expected_return: {
                                type: SchemaType.NUMBER,
                                description:
                                    "Expected return for the given month."
                            }
                        },
                        required: ["month", "expected_return"]
                    }
                }
            },
            required: [
                "asset_returns",
                "portfolio_return",
                "timeline_projection"
            ]
        },
        risk_analysis: {
            type: SchemaType.OBJECT,
            description: "Assessment of portfolio risk.",
            properties: {
                overall_risk: {
                    type: SchemaType.STRING,
                    description: "Overall risk level (e.g., low, medium, high)."
                },
                volatility: {
                    type: SchemaType.OBJECT,
                    description: "Volatility of each asset class.",
                    properties: {
                        stocks: {
                            type: SchemaType.NUMBER,
                            description: "Volatility of stocks."
                        },
                        bonds: {
                            type: SchemaType.NUMBER,
                            description: "Volatility of bonds."
                        },
                        currency: {
                            type: SchemaType.NUMBER,
                            description: "Volatility of currency."
                        },
                        gold: {
                            type: SchemaType.NUMBER,
                            description: "Volatility of gold."
                        }
                    }
                },
                loss_probability: {
                    type: SchemaType.NUMBER,
                    description: "Probability of portfolio loss."
                }
            },
            required: ["overall_risk", "volatility", "loss_probability"]
        },
        asset_recommendations: {
            type: SchemaType.OBJECT,
            description: "Recommended actions for each asset class.",
            properties: {
                actions: {
                    type: SchemaType.OBJECT,
                    description: "Recommended actions (e.g., buy, sell, hold).",
                    properties: {
                        stocks: {
                            type: SchemaType.STRING,
                            description: "Action for stocks."
                        },
                        bonds: {
                            type: SchemaType.STRING,
                            description: "Action for bonds."
                        },
                        currency: {
                            type: SchemaType.STRING,
                            description: "Action for currency."
                        },
                        gold: {
                            type: SchemaType.STRING,
                            description: "Action for gold."
                        }
                    }
                },
                adjustments: {
                    type: SchemaType.OBJECT,
                    description: "Percentage adjustments for each asset class.",
                    properties: {
                        stocks: {
                            type: SchemaType.NUMBER,
                            description: "Adjustment for stocks."
                        },
                        bonds: {
                            type: SchemaType.NUMBER,
                            description: "Adjustment for bonds."
                        },
                        currency: {
                            type: SchemaType.NUMBER,
                            description: "Adjustment for currency."
                        },
                        gold: {
                            type: SchemaType.NUMBER,
                            description: "Adjustment for gold."
                        }
                    }
                },
                notes: {
                    type: SchemaType.STRING,
                    description: "Additional notes or recommendations."
                }
            },
            required: ["actions", "adjustments", "notes"]
        },
        scenarios: {
            type: SchemaType.OBJECT,
            description: "Potential investment scenarios.",
            properties: {
                optimistic: {
                    type: SchemaType.OBJECT,
                    properties: {
                        expected_return: { type: SchemaType.NUMBER },
                        risk: { type: SchemaType.STRING }
                    },
                    required: ["expected_return", "risk"]
                },
                realistic: {
                    type: SchemaType.OBJECT,
                    properties: {
                        expected_return: { type: SchemaType.NUMBER },
                        risk: { type: SchemaType.STRING }
                    },
                    required: ["expected_return", "risk"]
                },
                pessimistic: {
                    type: SchemaType.OBJECT,
                    properties: {
                        expected_return: { type: SchemaType.NUMBER },
                        risk: { type: SchemaType.STRING }
                    },
                    required: ["expected_return", "risk"]
                }
            },
            required: ["optimistic", "realistic", "pessimistic"]
        },
        timeline_guidance: {
            type: SchemaType.ARRAY,
            description: "Guidance and advice over time.",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    month: {
                        type: SchemaType.NUMBER,
                        description: "Month of the guidance."
                    },
                    advice: {
                        type: SchemaType.STRING,
                        description: "Specific advice for the given month."
                    }
                },
                required: ["month", "advice"]
            }
        }
    },
    required: [
        "forecast",
        "risk_analysis",
        "asset_recommendations",
        "scenarios",
        "timeline_guidance"
    ]
};
