import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './navbar';
import Pie from './footer';


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
      <h1 className="col-12  d-flex justify-content-center">Categorias</h1>
      <ul>
        {categories.map((category) => (
          <div>
            <li>{category.name}</li>
            <ul>
              {category.videos.map((video) => (
                <li>
                  <a href={video.url}>{video.title}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
      <Pie />
    </>
  );
}

export default App;
