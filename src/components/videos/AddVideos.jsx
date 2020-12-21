import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
const apiurl = process.env.REACT_APP_APIURL;

const AddVideos = ({ setCategories, categories, videos, setVideos }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    title: "",
    url: "",
    owner: "Seleccione una categoría",
  });

  const handleClose = () => {
    setData({
      title: "",
      url: "",
      owner: "Seleccione una categoría",
    });
    setError("");
    setShow(false);
  };

  const handleChange = (e) => {
    try {
      setData({ ...data, [e.target.name]: e.target.value });
    } catch (error) {
      console.log(e.target);
      console.log(error);
    }
  };

  const validateFields = () => {
    if (!data.title.trim()) {
      setError("Debe ingresar un título!");
      return false;
    }
    if (!data.url.trim()) {
      setError("Debe ingresar una url!");
      return false;
    }
    if (data.owner.trim() === "Seleccione una categoría") {
      setError("Debe ingresar una categoría");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateFields();
    if (!isValid) return;
    try {
      const response = await fetch(`${apiurl}videos/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      setData({
        title: "",
        url: "",
        owner: "Seleccione una categoría",
      });
      setShow(false);
      if (!response.ok) {
        alert("Hubo un error");
        setShow(false);
        return;
      }
      setVideos([...videos, json.video]);
      setCategories(categories);
    } catch (error) {
      console.log(videos);
      console.error("Hubo un error en el fetch: ", error);
    }
  };

  return (
    <i
      className="fas fa-plus position-fixed p-2 rounded-circle"
      style={addVideoStyle}
      onClick={() => setShow(true)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {" "}
        {/* Sin el stopPropagation el modal no se cierra */}
        <AddVideoModal
          show={show}
          setShow={setShow}
          handleClose={handleClose}
          categories={categories}
          handleChange={handleChange}
          data={data}
          handleSubmit={handleSubmit}
          error={error}
          setError={setError}
        />
      </div>
    </i>
  );
};

const AddVideoModal = ({
  show,
  handleClose,
  categories,
  handleChange,
  data,
  handleSubmit,
  error,
  setError,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {error !== "" && <div className="alert alert-danger">{error}</div>}
          <Form.Group controlId="title">
            <Form.Label>Título del video</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Ingrese el título del video"
              onChange={handleChange}
              value={data.title}
            />
          </Form.Group>
          <Form.Group controlId="url">
            <Form.Label>URL del video</Form.Label>
            <Form.Control
              type="text"
              name="url"
              placeholder="Ingrese la URL del video"
              onChange={handleChange}
              value={data.url}
            />
          </Form.Group>
          <Form.Group controlId="owner" onSubmit={handleSubmit}>
            <Form.Label>Seleccione la categoría</Form.Label>
            <Form.Control
              as="select"
              name="owner"
              onChange={handleChange}
              value={data.owner}
            >
              <option disabled defaultValue="Seleccione una categoría">
                Seleccione una categoría
              </option>
              {categories.map((category, i) => (
                <option key={i} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddVideos;

const addVideoStyle = {
  fontSize: "3rem",
  right: "2rem",
  bottom: "2rem",
  color: "tomato",
  backgroundColor: "#333",
  cursor: "pointer"
};
