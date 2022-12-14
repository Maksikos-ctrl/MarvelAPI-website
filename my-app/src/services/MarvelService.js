//TODO Монтирование - создание компонента(componentDidMount()), e.g constructor => render => рефи => componentDidMount()
//? Размонтирование - удаление нашего компонента(componentWillUnmount()) 

class MarvelService {
    _apiBase = `https://gateway.marvel.com:443/v1/public/`; //! we say here that we can't change prop here
    _apiKey = `apikey=b4e4a5c2fc6d1d07764dfb1558661c00`;
    _baseOffset = 210;


    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Something wrong with fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=10&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?limit=9&offset=210&${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }


    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            descr: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homePage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;