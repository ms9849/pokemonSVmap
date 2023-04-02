
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
let pokemon = JSON.parse(fs.readFileSync('./pokemonData.json').toString());

async function test() {
    let url = await axios.get("https://pokemon.fandom.com/ko/wiki/%ED%8C%94%EB%8D%B0%EC%95%84%EB%8F%84%EA%B0%90");
    const $ = await cheerio.load(url.data);
    for (let i = 2; i <= 401; i++) {
        let paldeaNo = parseInt($(`#mw-content-text > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text().trim().slice(1)); //2번부터 시작. 시작은 나오하임
        let nationNo = parseInt($(`#mw-content-text > div > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text().trim().slice(1));
        delete pokemon.data[i - 2].location
        pokemon.data[i - 2].nationNo = nationNo;
        console.log(pokemon.data[i - 2]);
    }

    fs.writeFileSync('./pokemonData.json', JSON.stringify(pokemon));
}

console.log('done');

test();