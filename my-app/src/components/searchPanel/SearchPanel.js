import { Component } from 'react';

import './searchPanel.scss'

class SearchPanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        } 
    } 


    onUpdateSearch = (e) => { 
        const term = e.target.value;
        this.setState({term}); 
        this.props.onUpdateSearch(term); 
    }
   

    render() {
        const {term} = this.state;
        return (
            <input type="text" placeholder="Find character" value={term} onChange={this.onUpdateSearch} style={{'display': 'block', 'width': '100%', 'padding': '.375rem .75rem', 'fontSize': '1rem', 'color': '#212529', 'border': '1px solid #ced4da', 'borderRadius': '.375rem', 'fontWeight': 'bold'}}/>
        );   
    }
    
};

export default SearchPanel;