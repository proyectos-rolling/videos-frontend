import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom"; 

const Cards = ({ videos,getVideoImageUrl}) => {
  return (
    <Container>
      <Row>
        {videos.map((video) => (
          <Col key={video._id} >
            <Card style={{ width: "18rem" }}>
            <Link to={"/video/" + video._id}>
              <Card.Img variant="top" src={getVideoImageUrl(video.url)} />
              <Card.Body>
                <Card.Title className="text-dark">{video.title}</Card.Title>
                <Button variant="danger">Ir al Video</Button>
              </Card.Body>
              </Link>
            </Card>
             </Col>
           ))}
      </Row>
    </Container>
  );
};
export default Cards;
