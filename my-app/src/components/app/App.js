import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import SearchPanel from "../searchPanel/SearchPanel";
import MarvelService from '../../services/MarvelService';


import decoration from '../../resources/img/vision.png';


//? ref - это ссылка на элемент или компонент в DOM-дереве

// export const ContextTheme = createContext(null);
    // const [theme, setTheme] = useState('light'),
    //     themeToggler = () => {
    //         setTheme(curr => curr === 'light' ? 'dark' : 'light')
    //     }


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedChar: null,
            charList: [],
            term: ''
        }
    }

    marvelService = new MarvelService();

   

    onCharSelected = id => {
        this.setState({ selectedChar: id });
    }

    onUpdateSearch = (term, charList) => {
        this.filterImgs(charList)
        this.setState({term});
    }

    

    // searching = (items, term) => {
    //     if (term.length === 0) {
    //         return items;
    //     }

    //     return items.filter(item => {
    //         return item.name.indexOf(-1);  //? Возвращаем только те элементы которые имме.т имя у каждого элемента массива, потом прохоимся по строке методом indexOf
    //     });
    // }

    filterImgs = (term) => {
        // let newTerm = this.state.term.filter(c => c.name.indexOf(e.target.value) !== -1);
        if (term.length === 0) {
            return this.state.charList;
        }  

        return this.state.term.filter(item => {
            return item.name.indexOf(term) > -1; //? Возвращаем только те элементы которые имме.т имя у каждого элемента массива, потом прохоимся по строке методом indexOf
        });
        
    }


    render() {
        const {selectedChar} = this.state;
        return (
                <div className="app">
                    <AppHeader/>
                    <main>
                        <ErrorBoundary>
                           <RandomChar/>
                        </ErrorBoundary>
                       
                        <div className="char__content">
                            <ErrorBoundary>
                                <CharList onCharSelected={this.onCharSelected} />
                            </ErrorBoundary>
                            
                            <ErrorBoundary>
                                <CharInfo charId={selectedChar}/>
                            </ErrorBoundary>
                         
                        </div>
                        <img className="bg-decoration" src={decoration} alt="vision"/>
                    </main>
                </div>
         
        )
        
    }
 
}


export default App;