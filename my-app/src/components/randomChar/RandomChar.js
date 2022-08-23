
import { Component } from 'react'; 
import './randomChar.scss';

import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    
    constructor(props) {
        super(props);
        this.updateChar();
    } 

    state = {
       char: {},
       loading: true,
       error: false
    }

    marvelService = new MarvelService();

    onCharLoaded = char => {
        this.setState({char, loading: false}); // char: char
    }

    onErrorHandling = () => {
        this.setState({loading: false, error: true}); 
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1010699 - 1011334) + 1011334); //? Formula: Math.floor(random number * (max - min) + min), Math.floor() - function returns the largest integer less than or equal to a given number. 
        this.marvelService
            // .getAllCharacters()
            // .then(res => console.log(res));
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onErrorHandling);
    }


    render() {
        const {char, loading} = this.state;
     
        //Условний рендеринг
        return (
            <div className="randomchar">
                {loading ? <Spinner/> : <View char={char}/>}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
   
}

const View = ({char}) => {

    const {name, thumbnail, descr, homePage, wiki} = char,
        // thumbnailIsFound = !thumbnail ? 'https://http.dog/static/img/large/404.avif' : thumbnail,
        hasDescr = !descr ? 'Data about this hero is not defined' : descr;

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{hasDescr}             
                </p>
                <div className="randomchar__btns">
                    <a href={homePage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;