import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './navbar';
import Pie from './footer';


function App() {
  const apiurl = process.env.REACT_APP_APIURL;
  console.log(apiurl)
  const [categories, setCategories] = useState([]);

  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetch(apiurl + "categories").then(res => res.json()).then(json => setCategories(json))
  }, [])

  return (
    <>
      <Menu />
      <h1>Categorias</h1>
      <ul>
        {categories.map(category => <li>{category.name}</li>)}
      </ul>
      <Pie />
    </>
  );
}

export default App;
