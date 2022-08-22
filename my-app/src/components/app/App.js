import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { createContext, useState } from "react";

import decoration from '../../resources/img/vision.png';

export const ContextTheme = createContext(null);



const App = () => {

    const [theme, setTheme] = useState('light'),
        themeToggler = () => {
            setTheme(curr => curr === 'light' ? 'dark' : 'light')
        }

    return (
        <ContextTheme.Provider value={{theme, themeToggler}}>
            <div className="app" id={theme}>
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList/>
                        <CharInfo/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        </ContextTheme.Provider>
    )
}

export default App;