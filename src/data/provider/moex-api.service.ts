import { Injectable } from "@nestjs/common";
import axios from 'axios';

@Injectable()
export class MoexApiService {
    async getDataByDate (security: string, from: string, till: string) {
        const response = await axios.get(`https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/TQBR/securities/${security}.json?from=${from}&till=${till}&start=0`);
        const data = response.data;
        const openIndex = +data.history.columns.indexOf('OPEN');
        const closeIndex = +data.history.columns.indexOf('CLOSE');
        const highIndex = +data.history.columns.indexOf('HIGH');
        const lowIndex = +data.history.columns.indexOf('LOW');
        const volumeIndex = +data.history.columns.indexOf('VOLUME');
        const dataArray = data.history.data[0];
        const result = {
            open: dataArray[openIndex],
            close: dataArray[closeIndex],
            high: dataArray[highIndex],
            low: dataArray[lowIndex],
            volume: dataArray[volumeIndex]
        }
        return result;
    }

    async getMoexSecurities (securitiesAmount = 300) {
        const response = await axios.get("https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json?securities.columns=SECID,SHORTNAME");
        const data = response.data;
        const securities = [];
        data.securities.data.forEach(element => {
            securities.push(element[0]);
        });
        return securities;
    }

    async getHistoricalData (securities: string[], daysAmount: number = 100) {
        const historicalData = {};
        for (const security of securities) {
            const response = await axios.get(`https://iss.moex.com/iss/history/engines/stock/markets/shares/boards/TQBR/securities/${security}.json?from=2023-12-10&till=2024-12-10`);
            const data = response.data;
            const prices = [];
            data.history.data.forEach(item => {
                const closePrice = +item[9];
                prices.push(closePrice);
            });
            historicalData[security] = prices;
        }
        return historicalData;
    }    
}