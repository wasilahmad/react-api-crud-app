import React, { Component } from 'react';

// API Services
import API from './services/api';
// import data from './services/todos.json';

// components
import AddEditTodoModal from './components/add-edit-modal/add-edit-todo-component';
import ConfirmationModal from './components/confirmation-modal/confirmation-modal.component';

// font-awesome settings 
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPen, faTrash, faPlus, faCheckSquare, faSearch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faPen, faTrash, faPlus, faCheckSquare, faSearch);




export class App extends Component {

  state = {
    todos: [],
    modalMode: null,
    isModalVisible: false,
    payload: {
      title: '',
      completed: false
    },
    isConfirmationModalVisible: false
  };

  handleChange = e => {    
    this.setState({
      payload:{
        ...this.state.payload,
        title: e.target.value
      } 
    });
  }

  handleCheckbox = e => {    
    this.setState({      
      payload:{
        ...this.state.payload,
        completed: e.target.checked
      } 
    });
  }

  addTodo = () => {
    const { payload, isModalVisible } = this.state;
    const newTodo = {...payload, id: Math.floor(1000 + Math.random() * 9000), userId:1};
    const tempTodos = [newTodo, ...this.state.todos];
    // to validate input field
    if(payload.title !== undefined && payload.title !== '') {
      this.setState({ todos: tempTodos});
      this.closeModal(isModalVisible);
      this.setState({
        payload: {
          title: '',
          completed: false
        }
      });
    } else {
      window.alert('Title field can not be empty!');
    }
  }

  editTodo = payload => {
    const tempTodos = [...this.state.todos];
    const { id } = payload;
    let foundIndex = tempTodos.findIndex( item => item.id === id);
    tempTodos[foundIndex] = payload;
     // to validate input field
     if(payload.title !== undefined && payload.title !== '') {
      this.setState({
        ...this.state,
        todos: tempTodos
      });
      this.closeModal(this.state.isModalVisible);
    } else {
      window.alert('Title field can not be empty!');
    }
  }

  deleteTodo = id => {
     const tempTodos = [...this.state.todos];
     const todos = tempTodos.filter( item => item.id !== id );
     this.setState({
       ...this.state,
       todos
     });
  }

  completedTodo = id => {
    const tempTodos = [...this.state.todos];
    const foundIndex = tempTodos.findIndex( item => item.id === id);
    const todo = tempTodos[foundIndex];
    // console.log(todo)
    todo.completed = true;
    this.setState({
      ...this.state,
      todos: tempTodos
    });
  }

  refreshTodos() {
    API.get(`todos/`)
    .then(response => {
      // console.log(response);
      // console.log(response.data.slice(0, 10));
      this.setState({todos: response.data.slice(0, 10)})
    });
  }

  // add/edit todo modal
  openModal = (isVisible, mode, payload) => {
    if(mode === 'ADD') {
      this.setState({
        isModalVisible: isVisible,
        modalMode: mode
      }); 
    } else {
      this.setState({
        isModalVisible: isVisible,
        modalMode: mode,
        payload : payload
      }); 
    }       
  }

  closeModal = isVisible => {
    this.setState({isModalVisible: !isVisible});
  } 

  // confirmation cancel click
  handleOk = (id) => {
     this.deleteTodo(id);
     this.setState({
       isConfirmationModalVisible: false,
       payload: {
        title: '',
        completed: false
      }
    });
  }

  openConfirmationModal = (isVisible, payload) => {
    this.setState({
      isConfirmationModalVisible: isVisible,
      payload
    });
    console.log(payload)
  }
  
  closeConfirmationModal = isVisible => {
    this.setState({isConfirmationModalVisible: !isVisible});
  } 

  componentDidMount() {
    this.refreshTodos();
  }

  render() {
    const { todos } = this.state;

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
                  <input type="text" className="form-control" name="searchTodo" onChange={this.handleChange} placeholder="Search Todo" aria-label="search todo" aria-describedby="basic-addon2" />
                  <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2"><FontAwesomeIcon icon="search"/></span>
                  </div>
                </div>
              </div>
              <div className="col-6 text-right">
                <button type="button" className="btn btn-outline-primary" onClick={() => this.openModal(true, 'ADD', this.state.payload)}>
                  <FontAwesomeIcon icon="plus"/>  Add Todo
                </button>
              </div>
            </div>

            <ul className="list-group">
            {
              todos.map( (todo, index) => {
                return (
                  <li className={`list-group-item ${todo.completed ? 'completed' :''}`} key={todo.id}>
                    {`${todo.id}. ${todo.title}`}
                    <span className="action-button">  
                      {
                        !todo.completed ? (<FontAwesomeIcon icon="check-square" onClick={() => this.completedTodo(todo.id)} /> ) : null
                      }                
                                     
                      <FontAwesomeIcon icon="pen" onClick={() => this.openModal(true, 'EDIT', todo)}/>
                      <FontAwesomeIcon icon="trash" onClick={() => this.openConfirmationModal(true, todo)}/>
                    </span>
                  </li>
                )
              })
            }
            </ul>
          </div>
        </div>
        
        <AddEditTodoModal 
        isVisible={this.state.isModalVisible} 
        mode={this.state.modalMode} 
        closeModal={this.closeModal}
        handleChange={this.handleChange}
        handleCheckbox={this.handleCheckbox}
        addTodo={this.addTodo}
        editTodo={this.editTodo}
        payload={this.state.payload}
        />

        <ConfirmationModal 
        isVisible={this.state.isConfirmationModalVisible}
        closeModal={this.closeConfirmationModal}
        handleOk={this.handleOk}
        payload={this.state.payload}
        />

      </div>
    );
  }
  
}

export default App;
