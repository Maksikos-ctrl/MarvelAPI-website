import {Component} from 'react';

import './charInfo.scss';
import ErrorMsg from '../errorMessage/ErrorMsg';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';


class CharInfo extends Component {

    state = {
        char: null, // empty object in logic content is true, but null is empty irl
        loading: false, // we have skeleton instead simple loading gif
        error: false,
        showRandomChar: true
        
    }
 
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }


    updateChar = () => {
        const {charId} = this.props;
        if (!charId) return;

        this.onCharLoading();
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onErrorHandling);
    }

    onCharLoaded = char => {
        this.setState({char, loading: false}); // char: char
    }


    onCharLoading = () => {
        this.setState({ loading: true });
    }


    onErrorHandling = () => {
        this.setState({loading: false, error: true}); 
    }

    render() {
        const {char, loading, error} =  this.state,
            skeleton = char || loading || error ? null : <Skeleton/>, 
            errorFound = error ? <ErrorMsg/> : null,
            spinnerIs = loading ? <Spinner/> : null,
            content = !(loading || error || !char) ? <Display char={char}/> : null;


        return (
            <div className="char__info">
                {skeleton}
                {errorFound}
                {spinnerIs}
                {content}
            </div>
        )
    }
   
}

const Display = ({char}) => {
    const {name, thumbnail, descr, homePage, wiki, comics} = char,
        thumbnailIsFound = !thumbnail ? 'https://http.dog/static/img/large/404.avif' : thumbnail,
        hasDescr = !descr ? 'Data about this hero is not defined' : descr,
        comicsIs = !comics.length > 0 ? 'This character has not been filmed yet in any movie' : null;

    let imgStyle = {'objectFit' : 'cover'};
    const checkingOnError = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? imgStyle = {'objectFit' : 'contain'} : imgStyle = {'objectFit' : 'cover'}      

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={checkingOnError}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homePage} className="button button__main">
                            <div className="inner">Homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
               {hasDescr}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsIs}
                
                {
                    comics.map((i, n) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={n} className="char__comics-item">
                                
                                {i.name}
                            </li>
                        )
                    })
                }
                
                
            </ul>
        </>
    )
}

export default CharInfo;