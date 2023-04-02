import axios from "axios";
import * as fs from 'fs';
const cheerio = require('cheerio');

async function parsingBlog() {
    const url = "https://serebii.net";
    let pokemonList = await axios.get(url + "/pokedex-sv");
    let locationList: any = [];
    const $ = cheerio.load(pokemonList.data);
    let list: any = [];
    for(let i=2; i<=401; i++) {
        let pokemon = await $(`#content > main > div:nth-child(5) > table:nth-child(2) > tbody > tr > td:nth-child(4) > form > select > option:nth-child(${i})`).attr("value");
        await axios.get(url + pokemon);

    }

    const set = new Set(locationList);
    locationList = Array.from(set);

    console.log(locationList);
    fs.writeFileSync('pokemon.js', JSON.stringify((list)));
    fs.writeFileSync('region.js', JSON.stringify(locationList));

}
parsingBlog();


