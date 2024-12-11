import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { SecuritiesService } from '../../securities/securities.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MoexApiService {
    constructor(private readonly securitiesService: SecuritiesService) {}
    private readonly logger = new Logger(MoexApiService.name);
    async getDataByDate(security: string, from: string, till: string) {
        const response = await axios.get(
            `https://iss.moex.com/iss/history/engines/stock/markets/shares/securities/${security}.json?from=${from}&till=${till}&start=0`
        );
        const data = response.data;
        const openIndex = +data.history.columns.indexOf("OPEN");
        const closeIndex = +data.history.columns.indexOf("CLOSE");
        const highIndex = +data.history.columns.indexOf("HIGH");
        const lowIndex = +data.history.columns.indexOf("LOW");
        const volumeIndex = +data.history.columns.indexOf("VOLUME");
        const dataArray = data.history.data[0];
        const result = {
            open: dataArray[openIndex],
            close: dataArray[closeIndex],
            high: dataArray[highIndex],
            low: dataArray[lowIndex],
            volume: dataArray[volumeIndex]
        };

        return result;
    }

    async getMoexSecurities(param: string) {
        const response = await axios.get(
            `https://iss.moex.com/iss/engines/stock/markets/${param}/securities.json?securities.columns=SECID,SHORTNAME`
        );
        const data = response.data;
        const securities = [];
        data.securities.data.forEach((element) => {
            securities.push(element[0]);
        });

        return securities;
    }

    async getHistoricalData(param: string, securities: string[]) {
        const historicalData = {};
        for (const security of securities) {
            const response = await axios.get(
                `https://iss.moex.com/iss/history/engines/stock/markets/${param}/securities/${security}.json?from=2023-12-10&till=2024-12-10`
            );
            const data = response.data;
            const prices = [];
            data.history.data.forEach((item) => {
                const closePrice = +item[9];
                prices.push(closePrice);
            });
            historicalData[security] = prices;
        }

        return historicalData;
    }

    async calculateSlope(x: number[], y: number[]) {
        const n = x.length;
        if (n <= 1) {
            return 0;
        }

        const sumX = x.reduce((acc, val) => acc + val, 0);
        const sumY = y.reduce((acc, val) => acc + val, 0);
        const sumXY = x.reduce((acc, val, i) => acc + val * y[i], 0);
        const sumXSquared = x.reduce((acc, val) => acc + val ** 2, 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumXSquared - sumX ** 2);

        return slope;
    }

    async selectProfitableSecurities(
        securities: string[],
        historicalData: any
    ) {
        const profitableSecurities: string[] = [];

        for (const security of securities) {
            const prices = historicalData[security];
            const n = prices.length;
            if (n <= 1) {
                continue;
            }

            const x = Array.from({ length: n }, (_, i) => i);
            const slope = await this.calculateSlope(x, prices);

            const avgPrice = prices.reduce((acc, val) => acc + val, 0) / n;
            const variance =
                prices.reduce((acc, p) => acc + (p - avgPrice) ** 2, 0) / n;
            const stdDev = variance > 0 ? Math.sqrt(variance) : 0;

            if (slope > 0.01 && stdDev < 0.1 * avgPrice) {
                profitableSecurities.push(security);
            }
        }
        return profitableSecurities;
    }

    @Cron(' * * * 1 * *')
    async fillDataBase() {
        const shares = await this.getMoexSecurities("shares");
        const bonds = await this.getMoexSecurities("bonds");
        this.securitiesService.create(...shares);
        this.securitiesService.create(...bonds);
    }
}
