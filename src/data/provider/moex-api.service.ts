import { Inject, Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { SecuritiesService } from "../../securities/securities.service";
import { Cron } from "@nestjs/schedule";
import { SecurityCategories } from "src/securities/enums/security-categories.enum";
import { CreateSecurityDto } from "src/securities/dto/create-security.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { CacheStore } from "@nestjs/cache-manager/";  

@Injectable()
export class MoexApiService {
    constructor(private readonly securitiesService: SecuritiesService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: CacheStore
    ) {}

    private readonly logger = new Logger(MoexApiService.name);

    async getDataByDate(security: string, from: string, till: string) {
        const response = await axios.get(
            `https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/TQBR/securities/${security}.json?from=${from}&till=${till}&start=0`
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

    async getMoexSecuritiesIds(param: string) {
        const response = await axios.get(
            `https://iss.moex.com/iss/engines/stock/markets/${param}/boards/TQBR/securities.json?securities.columns=SECID,SHORTNAME`
        );
        const data = response.data;
        const securitiesIds = [];
        data.securities.data.forEach((element) => {
            securitiesIds.push(element[0]);
        });

        return securitiesIds;
    }

    async getMoexSecurities(param: string) {
        const response = await axios.get(
            `https://iss.moex.com/iss/engines/stock/markets/${param}/boards/TQBR/securities.json?securities.columns=SECID,SHORTNAME`
        );

        return response.data.securities.data;
    }

    async getHistoricalData(param: string, securities: string[]) {
        const historicalData = {};
        for (const security of securities) {
            const response = await axios.get(
                `https://iss.moex.com/iss/history/engines/stock/markets/${param}/boards/TQBR/securities/${security}.json?from=2023-12-10&till=2024-12-10`
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

        const cachedData = await this.cacheManager.get("profitableSecurities");
        if (cachedData) {
            return cachedData;
        } 

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
        await this.cacheManager.set("profitableSecurities", profitableSecurities, 15*60*1000);
        return profitableSecurities;
    }

    @Cron("* * * 1 * *")
    async updateSharesLocalData() {
        console.log("Began aggregating shares data...");

        const shares = await this.getMoexSecurities("shares");

        const entities: CreateSecurityDto[] = [];
        const profitableSecurities = await this.selectProfitableSecurities(
            shares.map((share) => share[0]),
            await this.getHistoricalData(
                "shares",
                shares.map((share) => share[0])
            )
        );

        const volatilities = await this.calculateVolatility("shares");
        for (const share of shares) {
            entities.push({
                ticker: share[0],
                name: share[1],
                category: SecurityCategories.STOCK,
                isProfitable: profitableSecurities.includes(share[0]),
                volatility: volatilities[share[0]]
            });
        }

        console.log("shares: ", entities);
        await this.securitiesService.bulkUpdate(entities);
    }

    @Cron("* * * 1 * *")
    async updateBondsLocalData() {
        console.log("Began aggregating bonds data...");

        const bonds = await this.getMoexSecurities("bonds");

        const entities: CreateSecurityDto[] = [];
        const profitableSecurities = await this.selectProfitableSecurities(
            bonds.map((bond) => bond[0]),
            await this.getHistoricalData(
                "bonds",
                bonds.map((bond) => bond[0])
            )
        );

        const volatilities = await this.calculateVolatility("bonds");
        for (const bond of bonds) {
            entities.push({
                ticker: bond[0],
                name: bond[1],
                category: SecurityCategories.BOND,
                isProfitable: profitableSecurities.includes(bond[0]),
                volatility: volatilities[bond[0]]
            });
        }

        console.log("bonds: ", entities);
        await this.securitiesService.bulkUpdate(entities);
    }

    async calculateVolatility(param: string) {
        const securities = await this.getMoexSecuritiesIds(param);
        const prices = await this.getHistoricalData(param, securities);
        const volatilities = {};
        for (const security of securities) {
            const returns = prices[security]
                .slice(1)
                .map((price, index) =>
                    Math.log(price / prices[security][index])
                );
            const meanReturn =
                returns.reduce((sum, r) => sum + r, 0) / returns.length;
            const variance =
                returns.reduce(
                    (sum, r) => sum + Math.pow(r - meanReturn, 2),
                    0
                ) /
                (returns.length - 1);
            volatilities[security] = Math.sqrt(variance);
        }
        return volatilities;
    }
}
