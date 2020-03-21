import React, { Component } from 'react';

// API Services
import API from './services/api';
// import data from './services/todos.json';

// components
import AddEditTodoModal from './components/add-edit-modal/add-edit-todo-component';
import ConfirmationModal from './components/confirmation-modal/confirmation-modal.component';
import Loader from './components/loader/loader.component';
import SearchTodo from './components/search-todo/search-todo.component';

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
    isConfirmationModalVisible: false,
    isLoading: true,
    searchField:''
  };


  handleTodoSearch = (e) => {
    this.setState({
      ...this.state,
      searchField: e.target.value
    });
  }

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

    // to validate input field
    if(payload.title !== undefined && payload.title !== '') {
      // to show loader while adding the data
      this.setState({isLoading: true});
      
      // add todo API call
      API.post(`/todos`, newTodo)
      .then(response => {
        const tempTodos = [response.data, ...this.state.todos]; 
        this.setState({ todos: tempTodos, isLoading: false});     
      });

      // to close todo modal
      this.closeModal(isModalVisible);      
      
      // to reset add todo form feilds
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

     // to validate input field
     if(payload.title !== undefined && payload.title !== '') {
      this.setState({
        isLoading: true
      });
      // edit todo API call
      API.put(`/todos/${id}`, payload)
      .then(response => {
        tempTodos[foundIndex] = response.data;
        // console.log('edit', response.data) 
        this.setState({
          ...this.state,
          todos: tempTodos,
          isLoading:false
        });    
      });
      this.closeModal(this.state.isModalVisible);
    } else {
      window.alert('Title field can not be empty!');
    }
  }

  deleteTodo = id => {
     const tempTodos = [...this.state.todos];
     const todos = tempTodos.filter( item => item.id !== id );
     this.setState({isLoading: true});
          
     API.delete(`/todos/${id}`)
     .then(response => {
       // console.log(response);
       console.log(response.data);
        this.setState({
          ...this.state,
          todos,
          isLoading: false
        });      
    });
  }

  completedTodo = id => {
    const tempTodos = [...this.state.todos];
    const foundIndex = tempTodos.findIndex( item => item.id === id);
    
    this.setState({ isLoading : true });

    // to update perticular key:value pair
    API.patch(`/todos/${id}`, { completed : true })
    .then(response => {
      tempTodos[foundIndex] = response.data;
      // console.log('edit', tempTodos[foundIndex]); 
      this.setState({
        ...this.state,
        todos: tempTodos,
        isLoading: false
      });       
    });    
  }

  refreshTodos() {
    API.get(`/todos`)
    .then(response => {
      // console.log(response);
      // console.log(response.data.slice(0, 10));
      this.setState({
        todos: response.data.slice(0, 10),
        isLoading: false
      });
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
    // console.log(payload)
  }
  
  closeConfirmationModal = isVisible => {
    this.setState({isConfirmationModalVisible: !isVisible});
  }   

  componentDidMount() {
    this.refreshTodos();
  }

  render() {
    const { todos, searchField } = this.state;

    const filteredTodo = todos.filter( todo => {
      return todo.title.toLowerCase().includes(searchField.toLowerCase());
    });

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
                <SearchTodo handleChange={this.handleTodoSearch} placeholder="Search Todo"/>
              </div>
              <div className="col-6 text-right">
                <button type="button" className="btn btn-outline-primary" onClick={() => this.openModal(true, 'ADD', this.state.payload)}>
                  <FontAwesomeIcon icon="plus"/>  Add Todo
                </button>
              </div>
            </div>

            <ul className="list-group">
            {
              filteredTodo.map( (todo, index) => {
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

        <Loader isLoading={this.state.isLoading} />

      </div>
    );
  }
  
}

export default App;
