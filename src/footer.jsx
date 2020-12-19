import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Logo from './logo.jpg';


const Pie = () => {

    return (
      <React.Fragment>
        <footer className="blog-footer">
          <div className="container">
            <div className="row d-flex">
              <div className="col-12 col-md d-flex justify-content-center align-items-center">
                <a target="_blank" rel="noreferrer" href="#link">
                  <img width="175" height="175" src={Logo} alt="logo1" />
                </a>
              </div>
            </div>
            <hr />
            <div className="row d-flex ">
              <div className="col-3 d-flex justify-content-center" >
                <a href="#top">
                  <h5 className="text-danger">Inicio</h5>
                </a>
              </div>
              <div className="col-3 d-flex justify-content-center" >
                <a href="#top">
                  <h5 className="text-danger">Agregar Video</h5>
                </a>
              </div>
              <div className="col-3 d-flex justify-content-center" >
                <a href="#top">
                  <h5 className="text-danger">Contacto</h5>
                </a>
              </div>
            </div>
            <hr />
          </div>
          <div className="row d-flex justify-content-around mt-2">
            <h5 className="text-danger">© 2020 VIDEOPUBLICO</h5>
          </div>
        </footer>
      </React.Fragment>
  
    );
  }
  
  export default Pie;