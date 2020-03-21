import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faSearch);

const SearchTodo = ({handleChange, placeholder}) => {
    return (
        <div className="input-group">
            <input type="text" className="form-control" name="searchTodo" onChange={(e) => handleChange(e)} placeholder={placeholder} aria-label="search todo" aria-describedby="basic-addon2" />
            <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2"><FontAwesomeIcon icon="search"/></span>
            </div>
        </div>
    );
}

export default SearchTodo;
