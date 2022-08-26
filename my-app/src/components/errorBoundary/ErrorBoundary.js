import { Component } from 'react';

//? Error boundaries - ловят ошибки: в методе render, в life cycle methods и конструкторах дочерних компонентов
//! Предохраните НЕ ЛОВЯТ - которые произошли внутри обработчиков событий, потому что события происходят вне метода render + сетевые запросы
class ErrorBoundary extends Component {
    state = {
        error: false
    }

    static getDerivedStateFromError() { //TODO It just updates a condition
        return {error: true}; //? it's kinda like setState but it works only with err
    }

    componentDidCatch(err, info) {
        console.log(err, info);
        this.setState({ error: true })
    }


    render() {
        if (this.state.error) {
            return <img src="https://http.dog/408.jpg" style={{'width': '650px'}} alt="Error" />
        }

        return this.props.children;
    }
}

export default  ErrorBoundary;