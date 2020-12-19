import React, {useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Modalito = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="danger" onClick={handleShow}>
         AGREGAR CATEGORIA
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleClose}>
              AGREGAR
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default Modalito