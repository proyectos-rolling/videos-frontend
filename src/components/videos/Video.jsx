import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import ReactPlayer from "react-player/youtube";
import { FacebookProvider, Comments } from "react-facebook";
import "./Video.css";

const apiurl = process.env.REACT_APP_APIURL;

const Video = ({ videos, setVideos }) => {
  const { id } = useParams();
  const history = useHistory();
  //busco el video en base al id de la URL, si no lo encuentra seteo un objeto vacío para evitar errores
  const video = videos.filter((video) => video._id === id)[0] || {
    _id: "",
    title: "",
    url: "",
    owner: "",
  };
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function fetchComments() {
      const response = await fetch(`${apiurl}videos/${video._id}`);
      const json = await response.json();
      setComments(json.comments || []);
    }
    fetchComments();
  }, [video._id]);

  //Borro el video
  const handleDelete = async () => {
    const confirm = window.confirm("Está seguro que quiere borrar el video?");
    if (!confirm) {
      return;
    }
    try {
      const response = await fetch(apiurl + "videos/" + video._id, {
        method: "DELETE",
      });
      if (response.ok) {
        setVideos(videos.filter((video) => video._id !== id));
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${apiurl}videos/${video._id}/comments/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: newComment }),
        }
      );
      const json = await response.json();
      if (!response.ok) {
        alert(json.error);
        return;
      }
      setComments([...comments, newComment]);
      setNewComment("");
    } catch (error) {
      console.log(videos);
      console.error("Hubo un error en el fetch: ", error);
    }
  };

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  if (video._id === "") {
    return (
      <div>
        <h1 className="col-12 d-flex justify-content-center">
          No existe ese video
        </h1>
        <Link to={"/"}>
          <Button>Volver</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="col-12 d-flex justify-content-center">{video.title}</h1>
      <ReactPlayer
        url={video.url}
        width="100%"
        controls
        playing
        className="react-player ratio ratio-1x1"
      />

      <div>
        <Button variant="danger" className="my-3" onClick={handleDelete}>
          Eliminar Video
        </Button>
      </div>
      <FacebookProvider appId="1043468026117602">
        <Comments
          href={`https://proyecto-videos-front.herokuapp.com/video/${video._id}`}
        />
      </FacebookProvider>

      {/* <h3 className="col-12 d-flex justify-content-center">Comentarios</h3>
      <Form onSubmit={addComment}>
        <Form.Group controlId="commentInput">
          <Form.Control
            type="text"
            autoFocus
            required
            className="text-center"
            value={newComment}
            placeholder="Ingrese un comentario"
            onChange={handleChange}
          />
        </Form.Group>
        {comments
          .slice(0) //el slice es para hacer una shallow copy y q el reverse no modifique el array original
          .reverse()
          .map((comment, i) => (
            <div
              key={i}
              className="col-12 d-flex justify-content-center border rounded-lg h4 p-3 shadow-sm"
            >
              {comment}
            </div>
          ))}
      </Form> */}
    </div>
  );
};

export default Video;
