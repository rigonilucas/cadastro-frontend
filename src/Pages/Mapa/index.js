import React, {useState} from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import logo from '../../logo.png';
import './style.css';
import { useHistory } from 'react-router-dom';

export default function Map() {
  const [response, setResponse] = useState(true);
  const history= useHistory();
  const responseFrom = useSelector(state => state.from);
  const responseTo = useSelector(state => state.to)
  const origin = responseFrom;
  const destination =  responseTo;
  const travelMode = 'DRIVING';
  
  
  


  const mapsKey = "AIzaSyDMSax5OQ3Pt49WzDMj5gb98GaJnnsMV7Q";

  const centerMap = {
    lat: -22.7945729,
    lng: -43.2988361
  }

  const mapsOptions = {

    zoomControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    draggableCursor: null,
    disableDefaultUI: true,

  }

  //Função que valida a busca da rota no google, se la for !== de null ela seta as infomações no response
  const directionsCallback = (response) => {
    
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse( response)
      }
    }
  }

  function toEntrega(){
    history.push('/lista');
  }

  return (
        <div id="container">
          <div id="containerTop">
            <div id = "logo">
              <img src={ logo }/>
            </div>
            <div id="containerButton">
              <button id="buttonBack"type="button" onClick={toEntrega} >Voltar</button>
            </div>
          </div>
          <LoadScript
             id="monitoring-map"
              googleMapsApiKey= {mapsKey}
          >
            <GoogleMap
              id='direction'
              mapContainerStyle={{
                height: '60vh',
                width: '80%',
                marginTop:'60px',
                justifySelf:'center'
              }}
              options={mapsOptions}
              zoom={10}
              center={centerMap}
            >

              { destination !== '' && origin !== '' ?
                  <DirectionsService
                    options={{
                       destination: destination,
                       origin: origin,
                       travelMode: travelMode
                    }}
                    callback={directionsCallback}
                  /> : null }

              { response !== null ?
                  <DirectionsRenderer
                    options={{
                      directions: response
                    }}
                  /> : null }
            </GoogleMap>
          </LoadScript>
          
        </div>
    )
}