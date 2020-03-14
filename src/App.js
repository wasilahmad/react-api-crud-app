import React, { Component } from 'react';

// font-awesome settings 
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen, faTrash, faPlus, faCheckSquare, faSearch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faPen, faTrash, faPlus, faCheckSquare, faSearch);


export class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            <h1 className="text-center mt-4 mb-3 pb-3 border-bottom">Todo App</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="row mb-3">
              <div className="col-6">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search Todo" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                  <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2"><FontAwesomeIcon icon="search"/></span>
                  </div>
                </div>
              </div>
              <div className="col-6 text-right">
                <button type="button" className="btn btn-outline-primary">
                  <FontAwesomeIcon icon="plus"/>  Add Todo
                </button>
              </div>
            </div>

            <ul className="list-group">
              <li className="list-group-item">
                Cras justo odio
                <span className="action-button">                  
                <FontAwesomeIcon icon="pen" />
                <FontAwesomeIcon icon="trash" />
                </span>
              </li>
              <li className="list-group-item">
                Dapibus ac facilisis in
                <span className="action-button">
                <FontAwesomeIcon icon="check-square" />                
                <FontAwesomeIcon icon="pen" />
                <FontAwesomeIcon icon="trash" />
                </span>
              </li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item completed" >
                Vestibulum at eros
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => console.log(json))
  }
}

export default App;
