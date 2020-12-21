import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ReactPlayer from 'react-player/youtube'


const Video = ({ videos }) => {
    const { id } = useParams()
    const video = videos.filter((video)=>video._id===id)[0]
    // const apiurl = process.env.REACT_APP_APIURL;
    // const HandleDelete = () =>{
    //     fetch(apiurl,{method:"DELETE"}).then;
    // }

    return (
        <div>
            <ReactPlayer
                url={video.url}
                width='100%'
                controls
                playing
            />

            <Button>Eliminar Video</Button>

        </div>
    )
}

export default Video