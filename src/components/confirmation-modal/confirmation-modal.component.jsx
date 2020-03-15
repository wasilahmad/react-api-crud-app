import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './confirmation-modal.component.css';

const ConfirmationModal = ({isVisible, closeModal, handleOk, payload}) => {
    return (
        <div>
            <Modal
            size="lg"
            show={isVisible}
            onHide={() => closeModal(isVisible)}
            className="confirmation-modal"
            aria-labelledby="confirmation-modal-title">
                <Modal.Header closeButton>
                    <Modal.Title id="confirmation-modal-title">
                        Confirmation 
                    </Modal.Title>
                </Modal.Header>                
                <Modal.Body>
                   <p>Are you sure you want to delete the record!</p>             
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={() => closeModal(isVisible)}>No</Button>
                    <Button variant="outline-primary" onClick={() => handleOk(payload.id)}>Yes</Button>                                    
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ConfirmationModal;
