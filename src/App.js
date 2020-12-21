import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './navbar';
import Pie from './footer';
import Video from './components/videos/Video';
import { Button } from 'react-bootstrap'
import { Switch, Route, Link } from "react-router-dom";

const getVideoImageUrl = (url) => {
  const preRegex = /.*v=(.*)/; //capturo todo lo que está después del "v="
  let videoId = url.replace(preRegex, "$1"); //creo una string que tenga todo lo capturado
  const posRegex = /(.*?)(&.*|$)/; //campturo todo lo q está antes de un & o toda la string
  videoId = videoId.replace(posRegex, "$1"); //reemplazo con lo capturado
  const VideoImageUrl = ` https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`; //de este modo obtengo la thumbnail del video
  return VideoImageUrl
}


function App() {
  const apiurl = process.env.REACT_APP_APIURL;
  const [categories, setCategories] = useState([]);

  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetch(apiurl + "categories").then(res => res.json()).then(json => setCategories(json))
  }, [])

  useEffect(() => {
    fetch(apiurl + "videos")
      .then((res) => res.json())
      .then((json) => setVideos(json));
  }, []);

  return (
    <>
      <Menu categories={categories} setCategories={setCategories} />
      <Switch>
        <Route path="/" exact>
          <h1 className="col-12  d-flex justify-content-center">Categorias</h1>
          <ul>
            {categories.map((category) => (
              <div>
                <li>{category.name}</li>
                <ul>
                  {category.videos.map((video) => (
                    <li>
                      <img
                        src={getVideoImageUrl(video.url)}
                        alt={video.title}
                      />
                      {/* <a href={video.url}>{video.title}</a> */}

                      <Link to={"/video/" + video._id}>
                        <Button>Ir al Video</Button>
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
