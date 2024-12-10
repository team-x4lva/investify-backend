import { Injectable } from "@nestjs/common";
import * as cheerio from "cheerio";
import axios from "axios";

@Injectable()
export class ScrapperService {
    private depositRatesEndpoint = "http://www.sravni.ru/vklady/";

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
}
