

class MarvelService {
    _apiBase = `https://gateway.marvel.com:443/v1/public/`; //! we say here that we can't change prop here
    _apiKey = `apikey=b4e4a5c2fc6d1d07764dfb1558661c00`;


    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Something wrong with fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?limit=9&offset=210&${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }


    _transformCharacter = (char) => {
        return {
            name: char.name,
            descr: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homePage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;