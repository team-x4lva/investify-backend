import { SetMetadata } from "@nestjs/common";

export const GET_PROGNOSIS_PROMPT = `Analyze the provided financial data and user preferences to generate a detailed investment strategy tailored to the user's risk tolerance and investment horizon. Predict asset returns, evaluate risks, and recommend specific actions for optimizing the portfolio over the selected investment period. Incorporate growth or decline predictions for key assets and suggest when to buy, sell, or adjust allocations. Provide the response in JSON format with the following structure:

1. Forecast:
Predicted returns for each asset over the user's investment horizon (short-term, medium-term, long-term).
Portfolio-level return projections aligned with market conditions.
2. Risk Analysis:
Overall risk assessment for the portfolio.
Volatility predictions for each asset.
Probability of loss scenarios for the investment horizon.
3. Asset Recommendations:
Specific actions (buy/sell/hold) for each asset (stocks, bonds, gold, currency).
Recommendations for adjusting asset allocations to improve portfolio performance.
4. Scenario Analysis:
Three scenarios (optimistic, realistic, pessimistic) including expected portfolio returns and risks.
Key events or factors that might influence the scenarios (e.g., interest rate changes, geopolitical events).
5. Timeline-Based Guidance:
Suggestions for periodic portfolio rebalancing during the investment period.
Guidance on how to respond to potential market changes (e.g., increase gold allocation during inflation spikes).

Response JSON Example:
{
  "forecast": {
    "asset_returns": {
      "stocks": 0.12,
      "bonds": 0.06,
      "currency": 0.03,
      "gold": 0.08
    },
    "portfolio_return": 0.09,
    "timeline_projection": [
      {"month": 1, "expected_return": 0.01},
      {"month": 6, "expected_return": 0.05},
      {"month": 12, "expected_return": 0.09}
    ]
  },
  "risk_analysis": {
    "overall_risk": "medium",
    "volatility": {
      "stocks": 0.20,
      "bonds": 0.05,
      "currency": 0.02,
      "gold": 0.10
    },
    "loss_probability": 0.1
  },
  "asset_recommendations": {
    "actions": {
      "stocks": "buy",
      "bonds": "hold",
      "currency": "buy",
      "gold": "hold"
    },
    "adjustments": {
      "stocks": 35,
      "bonds": 40,
      "currency": 15,
      "gold": 10
    },
    "notes": "Consider reducing stock exposure after 6 months due to potential market correction."
  },
  "scenarios": {
    "optimistic": {
      "expected_return": 0.15,
      "risk": "high"
    },
    "realistic": {
      "expected_return": 0.09,
      "risk": "medium"
    },
    "pessimistic": {
      "expected_return": 0.02,
      "risk": "low"
    }
  },
  "timeline_guidance": [
    {"month": 3, "advice": "Increase gold allocation by 5% due to rising inflation."},
    {"month": 6, "advice": "Rebalance portfolio to reduce stock exposure by 10%."},
    {"month": 12, "advice": "Evaluate bond yields for reinvestment opportunities."}
  ]
}
Ensure that the recommendations align with the user's preferences and market trends. Focus on clear, actionable advice tied to the investment period and potential market events.`;

export const GENERATE_PORTFOLIO_PROMPT = `Generate an investment portfolio tailored to a selected strategy and specified allocation preferences.

Key Parameters:

Strategy Type:

Conservative: Focus on capital preservation with low risk and steady returns. Allocate a higher percentage to bonds and stable instruments.
Balanced: Aim for moderate risk and returns by blending equities and bonds, complemented with smaller portions of alternative assets.
Aggressive: Prioritize growth with high risk and potential for high returns, focusing on equities and alternative investments.
Asset Categories:

Equities (Stocks): Include large-cap, mid-cap, and small-cap stocks diversified across industries and geographies, with a preference for Russian companies.
Bonds: Include government bonds, corporate bonds, and municipal bonds with varying durations, prioritizing Russian issuers.
Currency: Incorporate foreign exchange options for diversification and hedging.
Gold: Provide stability and hedge against inflation.
Oil: Exposure to energy markets, with an emphasis on Russian producers where applicable.
Percentage Allocation:

Users can specify desired percentages for each category or follow default allocations aligned with the strategy.
Additional Requirements:

Tailor allocations to minimize risks within each category.
Provide diversification by including a mix of assets in each category.
Ensure the portfolio aligns with the given strategy while maintaining flexibility for market conditions.
Where possible, prioritize instruments linked to Russian companies or issuers.`;

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
