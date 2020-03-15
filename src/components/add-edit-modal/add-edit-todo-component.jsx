import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './add-edit-todo.component.css';

const AddEditTodoModal = ({isVisible, mode, closeModal, ...props}) => { 
    const { handleChange, handleCheckbox, addTodo, editTodo, payload } = props;    
    return (
        <div>
            <Modal
                size="lg"
                show={isVisible}
                onHide={() => closeModal(isVisible)}
                aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        { mode === 'ADD' ? 'Add Todo' : 'Edit Todo' } 
                    </Modal.Title>
                </Modal.Header>                
                <Modal.Body>
                    <div className="form-group row">
                        <label htmlFor="inputTodoTitle" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                            <input type="text" name="title" value={payload.title} onChange={(event) => handleChange(event)} className="form-control" id="inputTodoTitle" required/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-2">Status</div>
                        <div className="col-sm-10">
                            <div className="form-check">
                            <input className="form-check-input" name="isTodoCompleted" defaultChecked={payload.completed} onClick={(event) => handleCheckbox(event)} type="checkbox" id="todoCompletedCheckbox" />
                            <label className="form-check-label" htmlFor="todoCompletedCheckbox">
                                Mark as completed todo 
                            </label>
                            </div>
                        </div>
                    </div>              
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={() => closeModal(isVisible)}>Close</Button>
                    {
                        mode === 'ADD' ? (<Button variant="outline-primary" onClick={() => addTodo()}>Add Todo</Button>) : (<Button variant="outline-primary" onClick={() => editTodo(payload)}>Update Todo</Button>) 
                    }                    
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddEditTodoModal;
