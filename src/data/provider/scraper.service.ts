import { Injectable } from "@nestjs/common";
import * as cheerio from "cheerio";
import axios from "axios";

@Injectable()
export class ScraperService {
    private depositRatesEndpoint = "http://www.sravni.ru/vklady/";
    private recommendationsEndpoint =
        "http://www.banki.ru/investment/analitika/";
    private stocksEndpoint =
        "https://ru.tradingview.com/markets/stocks-russia/sectorandindustry-industry/";

    async getBestDepositRates() {
        const response = await axios.get(this.depositRatesEndpoint);

        const $ = cheerio.load(response.data);
        const text = $.extract({
            div: [".style_rate__uhpcp"],
            percentages: [
                {
                    selector: "h4"
                }
            ],
            time: [
                {
                    selector: "div._18gm672"
                }
            ]
        });
        console.log(text);
        return text;
    }

    private async getRecommendations() {
        const response = await axios.get(this.recommendationsEndpoint);
        const $ = cheerio.load(response.data);
        const recommendations = $.extract({
            div: [".jzwzIT"]
        });
        console.log(recommendations);
        return recommendations;
    }

    private async getStocks() {
        const response = await axios.get(this.stocksEndpoint);
        const $ = cheerio.load(response.data);
        const bareStocks = $.extract({
            tr: [".row-RdUXZpkv.listRow"],
            rows: [
                {
                    selector: "td.cell-RLhfr_y4"
                }
            ]
        });
        const stocks = [];
        for (let i = 0; i < bareStocks.rows.length; i += 7) {
            stocks.push({
                name: bareStocks.rows[i],
                capitalizations: bareStocks.rows[i + 1],
                dividends: bareStocks.rows[i + 2],
                change: bareStocks.rows[i + 3],
                volumes: bareStocks.rows[i + 4],
                sector: bareStocks.rows[i + 5],
                stocksAmount: bareStocks.rows[i + 6]
            });
        }
        console.log(stocks);
        return stocks;
    }

    async getNews() {
        const now = new Date();
        const past = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const apiKey = "abd0c7e3909f426982e9e4b7b74ffbc8";
        const newsEndpoint = `http://newsapi.org/v2/everything?q=(политика OR экономика) AND NOT спорт&from=${past}&to=${now}&sortBy=popularity&language=ru&apiKey=${apiKey}`;
        const response = await axios.get(newsEndpoint);
        return response.data;
    }
}
