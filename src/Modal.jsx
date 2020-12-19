import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Modalito = ({categories, setCategories}) => {
  const apiurl = process.env.REACT_APP_APIURL;
  const [data, setData] = useState({
    name: ""
  });

  const handleChange = (e) => {
    try {
      setData({ ...data, [e.target.name]: e.target.value });
      console.log(data)
    } catch (error) {
      console.log(e.target);
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiurl}categories/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setData({
            name: ""
          });
         setShow(false) 
        }
        return response.json();
      })
      .then((json) => {
        console.log(categories)
        setCategories([...categories,json.category])
      })
      .catch((error) => {
        console.log(categories)
        console.error("Hubo un error en el fetch: ", error);
      });
  };

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
          <Modal.Title>Agregar Categoria</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicPassword">
    <Form.Control required="text" name="name" value={data.name} type="text" placeholder="Categoria Nueva" onChange={handleChange}  />
  </Form.Group>
  <Button variant="danger" type="submit">
    AGREGAR
  </Button>
  </Form>
        <Modal.Footer>
          <Button variant="muted" onClick={handleClose}>
            CERRAR
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modalito