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
        <div style={{ background: "tomato" }}>
            <ReactPlayer
                url='https://www.youtube.com/watch?v=TKfRm6uNx7I&ab_channel=NPRMusic'
                width='1000px'
                height='500px'
                style={{ position: 'absolute' }}
                controls
                playing
            />

            <Button>Eliminar Video</Button>

        </div>
    )
}

export default Video