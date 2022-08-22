

class MarvelService {
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Something wrong with fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource('https://gateway.marvel.com:443/v1/public/characters?apikey=b4e4a5c2fc6d1d07764dfb1558661c00');
    }
}

export default MarvelService;