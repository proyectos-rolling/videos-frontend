import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './navbar';
import Pie from './footer';
import Video from './components/videos/Video';
import { Button } from 'react-bootstrap'
import { Switch, Route, Link } from "react-router-dom";
import AddVideo from "./components/videos/AddVideos";
import Quote from "./components/Quote"

const getVideoImageUrl = (url) => {
  const preRegex = /.*v=(.*)/; //capturo todo lo que está después del "v="
  let videoId = url.replace(preRegex, "$1"); //creo una string que tenga todo lo capturado
  const posRegex = /(.*?)(&.*|$)/; //campturo todo lo q está antes de un & o toda la string
  videoId = videoId.replace(posRegex, "$1"); //reemplazo con lo capturado
  const VideoImageUrl = ` https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`; //de este modo obtengo la thumbnail del video
  return VideoImageUrl
}

const apiurl = process.env.REACT_APP_APIURL;

function App() {
  const [categories, setCategories] = useState([]);

  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetch(apiurl + "categories").then(res => res.json()).then(json => setCategories(json))
  }, [videos])

  useEffect(() => {
    fetch(apiurl + "videos")
      .then((res) => res.json())
      .then((json) => setVideos(json));
  }, []);

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
          <h1 className="col-12  d-flex justify-content-center">Categorias</h1>
          <ul>
            {categories.map((category) => (
              <div>
                <li><h3>{category.name}</h3></li>
                <ul>
                  {category.videos.map((video) => (
                    <li>
                      <img
                        src={getVideoImageUrl(video.url)}
                        alt={video.title}
                      />
                      {/* <a href={video.url}>{video.title}</a> */}

                      <Link to={"/video/" + video._id}>
                        <Button variant="danger">Ir al Video</Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
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
