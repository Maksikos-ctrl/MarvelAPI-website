import {Component} from 'react';

import PropTypes from 'prop-types'; 
import './charInfo.scss';
import ErrorMsg from '../errorMessage/ErrorMsg';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';


//! Typescript validates types at compile time, whereas PropTypes are checked at runtime. 
//TODO Typescript is useful when you are writing code: it will warn you if you pass an argument of the wrong type to your React components, give you autocomplete for function calls, etc.

//? PropTypes are useful when you test how the components interact with external data, for example when you load JSON from an API. PropTypes will help you debug (when in React's Development mode) why your component is failing by printing helpful messages like: 



//TODO Вопрос на собесе: Можно ли при помощи propTypes устанавливать пропси по умолчанию? -Да, это можно сделать, с помощью defaultProps

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


    // componentDidCatch(err, info) {
    //     console.log(err, info);
    //     this.setState({ error: true });
    // }


    updateChar = () => {
        const {charId} = this.props;
        if (!charId) return;

        this.onCharLoading();
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onErrorHandling);

        // this.foo.bar = 0;    
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
    const {name, thumbnail, descr, homePage, wiki, comics, id} = char,
        thumbnailIsFound = !thumbnail ? 'https://http.dog/static/img/large/404.avif' : thumbnail,
        hasDescr = !descr ? 'Data about this hero is not defined' : descr,
        comicsIs = !comics.length > 0 ? 'This character has not been filmed yet in any movie' : null;
       

    let imgStyle = {'objectFit' : 'cover'},
        randomId = Math.random(Math.floor(id * 10) / 10 );
    const checkingOnError = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? imgStyle = {'objectFit' : 'contain', 'paddingTop': 30} : imgStyle = {'objectFit' : 'cover'}
    // if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    //     imgStyle = {'objectFit' : 'contain'};
    // }      

    return (
        <>
            <div className="char__basics">
                <img className="char__img" src={thumbnail} alt={name} style={checkingOnError}/>
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
            <p className="char__descr">
               <h2 className="char__descr description">{hasDescr}</h2>
            </p>
            <p className="char__comics">Comics:</p>
            <ul className="char__comics-list">
                {comicsIs}


               
                
                {
                    comics.map((i, n) => {
                        // eslint-disable-next-line
                       
                        return (
                            <li key={n} className={"char__comics-item " + randomId}>
                                
                                {i.name}
                            </li>
                        )
                    })
                }
                
                
            </ul>
        </>
    )
}


CharInfo.propTypes = {
    charId: PropTypes.string
}

export default CharInfo;