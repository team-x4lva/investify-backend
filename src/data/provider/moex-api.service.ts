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
}