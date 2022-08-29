import { Component } from 'react'; 

import PropTypes from 'prop-types';
import './charList.scss';
import ErrorMsg from '../errorMessage/ErrorMsg';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import './charList.scss';


//TODO Вопрос на собесе: Чем композиция лучше чем насследование? Что из них юзаеться чаще? - Всегда юзаеться композиция, потому что есть все встроенный возможности для удобного приминение композиции  



class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newLoadingEl: false,
        offset: 210
    }
    
    marvelService = new MarvelService();

    componentDidMount() {

        this.onRequest();

        // if (this.state.offset < 219) {
        //     this.onRequest();
        // }
        
        // window.addEventListener('scroll', this.onScroll); 

         
    }


    // onScroll = () => {
    //     if (this.state.offset < 219) return;
    //     if (this.state.newLoadingEl) return;
    //     if (this.state.charEnded) {
    //         window.removeEventListener('scroll', this.onScroll);
    //     }

    //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //         this.onCharListLoading();
    //         this.onRequest(this.state.offset);
    //     }
    // }

   
    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }


    onCharListLoading = () => {
        this.setState({ newLoadingEl: true});
    }

  

    onCharListLoaded = (newCharList) => {

        let ended = false;

        newCharList.length < 9 ? ended = true : ended = false;
            
    

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newLoadingEl: false,
            // Our new img will be displaying as prev(there are 9 imgs, cuz i set it in api sets)
            offset: offset + 9,
            charEnded: ended,
        
             
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    renderItems(arr) {
        const items = arr.map(item => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item" key={item.id} onClick={() => this.props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const {charList, loading, error, offset, newLoadingEl, charEnded} = this.state,
            items = this.renderItems(charList),
            errorMessage = error ? <ErrorMsg/> : null,
            spinner = loading ? <Spinner/> : null,
            content = !(loading || error) ? items : null,
            charIsEnded =  charEnded ? 'none' : 'block';

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                disabled={newLoadingEl}
                style={{'display': charIsEnded}}
                onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}


export default CharList;