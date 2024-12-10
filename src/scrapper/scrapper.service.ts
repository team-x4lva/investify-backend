import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import axios from 'axios';

@Injectable()
export class ScrapperService {
    async bestRateSravniRu () {
        const response = await axios.get('http://www.sravni.ru/vklady/') 
        const $ = cheerio.load(response.data); 
        const text = $.extract({
            div: ['.style_rate__uhpcp'],
            percentages: [{
                selector: 'h4',
            }],
            time: [{
                selector: 'div._18gm672',
            }]
        });
        console.log(text)
        return text;
    }   
}
