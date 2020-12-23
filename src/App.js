import React, { useState, useEffect } from "react";
import "./App.css";
import Menu from "./navbar";
import Pie from "./footer";
import Video from "./components/videos/Video";
import { Button } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import AddVideo from "./components/videos/AddVideos";
import Quote from "./components/Quote";
import Cards from "./components/Cards";

const getVideoImageUrl = (url) => {
  const preRegex = /.*v=(.*)/; //capturo todo lo que está después del "v="
  let videoId = url.replace(preRegex, "$1"); //creo una string que tenga todo lo capturado
  const posRegex = /(.*?)(&.*|$)/; //campturo todo lo q está antes de un & o toda la string
  videoId = videoId.replace(posRegex, "$1"); //reemplazo con lo capturado
  const VideoImageUrl = ` https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`; //de este modo obtengo la thumbnail del video
  return VideoImageUrl;
};

const apiurl = process.env.REACT_APP_APIURL;

function App() {
  const [categories, setCategories] = useState([]);

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(apiurl + "categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, [videos]);

  useEffect(() => {
    fetch(apiurl + "videos")
      .then((res) => res.json())
      .then((json) => setVideos(json));
  }, []);

  const handleDeleteCategory = async (id) => {
    const confirm = window.confirm(
      "Está seguro que quiere borrar la categoria?"
    );
    if (!confirm) {
      return;
    }
    try {
      const response = await fetch(apiurl + "categories/" + id, {
        method: "DELETE",
      });
      const json = await response.json();
      if (response.ok) {
        setCategories(categories.filter((category) => category._id !== id));
        return;
      }
      alert(json.msg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Menu categories={categories} setCategories={setCategories} />
      <AddVideo
        categories={categories}
        videos={videos}
        setVideos={setVideos}
        setCategories={setCategories}
      />
      <Switch>
        <Route path="/" exact>
          <Quote />
          <div className="container">
            <h1 className="col-12  d-flex justify-content-center">
              Categorias
            </h1>
            <ul>
              {categories.map((category) => (
                <div key={category._id}>
                  <li className="d-flex justify-content-between pb-1 border-bottom my-4">
                    <h3>{category.name}</h3>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteCategory(category._id)}
                    >
                      {" "}
                      Borrar categoria{" "}
                    </Button>
                  </li>
                  <Cards
                    videos={category.videos}
                    getVideoImageUrl={getVideoImageUrl}
                  />
                </div>
              ))}
            </ul>
          </div>
        </Route>
        <Route path="/video/:id">
          <Video videos={videos} setVideos={setVideos} />
        </Route>
      </Switch>
      <Pie />
    </>
  );
}

export default App;
