import { SetMetadata } from "@nestjs/common";

export const GET_SIMULATION_PROMPT = `Analyze the provided financial data and user preferences to generate a detailed investment strategy tailored to the user's risk tolerance and investment horizon. Predict asset returns, evaluate risks, and recommend specific actions for optimizing the portfolio over the selected investment period. Incorporate growth or decline predictions for key assets and suggest when to buy, sell, or adjust allocations. Provide the response in JSON (but without the \`\`\`json ...\`\`\` wrapping):

1. Forecast:
Predicted returns for each asset over the user's investment horizon: from {startDate} to {endDate} (short-term, medium-term, long-term).
Portfolio-level return projections aligned with market conditions.
2. Risk Analysis:
Overall risk assessment for the given portfolio within the investment horizon of {moneyAmount}.
Volatility predictions for each asset from {portfolio}.
Probability of loss scenarios for the investment horizon.
3. Asset Recommendations:
Specific actions (buy/sell/hold) for each asset (stocks, bonds, gold, currency) from {portfolio}.
Recommendations for adjusting asset allocations to improve portfolio performance.
4. Scenario Analysis:
Three scenarios (optimistic, realistic, pessimistic) including expected portfolio returns and risks.
Key events or factors that might influence the scenarios (e.g., interest rate changes, geopolitical events).
5. Timeline-Based Guidance:
Suggestions for periodic portfolio rebalancing during the investment period.
Guidance on how to respond to potential market changes (e.g., increase gold allocation during inflation spikes).
6. Profit-time curve:
In addition to the forecast, provide the points for the graph in the specified format. 

Ensure that the recommendations align with the user's preferences and market trends. Focus on clear, actionable advice tied to the investment period and potential market events.`;

export const GENERATE_PORTFOLIO_PROMPT = `Generate an investment portfolio tailored to a selected strategy and specified allocation preferences. You should choose investing instruments from the dataset supplied to you, which is an array of objects with the following structure:
{
    id: number;
    name: string;
    ticker: string;
    category: string;
    isProfitable: boolean;
    volatility: number;
}

You should base your answer on the user preferences, as well as on the properties of the each investing instrument supplied to you in the dataset.

Key Parameters: 
  Start Date: {startDate} 
  End Date: {endDate} 
  Money Amount: {moneyAmount}
  Desired degree of risk (0 - no risk at all, 1 - maximum risk): {volatility}

Choose the investment strategy based on the desired degree of risk:
- conservative (0 - 0.3 risk degree): Focus on capital preservation with low risk and steady returns. Allocate a higher percentage to bonds and stable instruments.
- balanced (0.3 - 0.7 risk degree): Aim for moderate risk and returns by blending equities and bonds, complemented with smaller portions of alternative assets.
- aggressive (0.7 - 1 risk degree): Prioritize growth with high risk and potential for high returns, focusing on equities and alternative investments.

Asset Categories: {desiredInstrumentsCategories}
Equities (Stocks): Include large-cap, mid-cap, and small-cap stocks diversified across industries and geographies, with a preference for Russian companies.
Bonds: Include government bonds, corporate bonds, and municipal bonds with varying durations, prioritizing Russian issuers.
Currency: Incorporate foreign exchange options for diversification and hedging.

Generate percentage allocations for chosen asset category based on the selected strategy and user preferences.

Users can specify desired percentages for each category or follow default allocations aligned with the strategy.

Additional Requirements: 
- tailor allocations to minimize risks within each category.
- provide reasonable diversification by including a mix of assets in each category.
- ensure the portfolio aligns with the given strategy while maintaining flexibility for market conditions.
- where possible, prioritize instruments linked to Russian companies or issuers.

Translate response text to Russian. Provide the response in JSON (but without the \`\`\`json ...\`\`\` wrapping).

Use the following dataset of investing instruments: {dataset}.

Use the following dataset of news: {articles} to analyze the political-economic situation`;

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
