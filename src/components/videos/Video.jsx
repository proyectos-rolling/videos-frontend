import React from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import ReactPlayer from 'react-player/youtube'
import { FacebookProvider, Comments } from "react-facebook";
import './Video.css'


const apiurl = process.env.REACT_APP_APIURL;

const Video = ({ videos, setVideos }) => {
    const { id } = useParams()
    const history = useHistory()
    //busco el video en base al id de la URL, si no lo encuentra seteo un objeto vacío para evitar errores
    const video = videos.filter((video)=>video._id===id)[0] || {_id:"",title:"",url:"",owner:""}

    //Borro el video
    const handleDelete = async () =>{
        const confirm = window.confirm("Está seguro que quiere borrar el video?")
        if(!confirm) {
            return
        }
        try{
            const response = await fetch(apiurl+"videos/"+video._id,{method:"DELETE"})
            if (response.ok){
                setVideos(videos.filter(video=>video._id!==id))
                history.push("/")
            }
        }catch (error) {
            console.log(error)
        }
    }
    if(video._id===""){
        return (
          <div>
              <h1 className="col-12 d-flex justify-content-center">
                No existe ese video
              </h1>
              <Link to={"/"}><Button>Volver</Button></Link>
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
          <Comments href="https://developers.facebook.com/docs/plugins/comments#configurator" />
        </FacebookProvider>
      </div>
    );
}

export default Video