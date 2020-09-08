import React, {useState} from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
import { useSelector } from 'react-redux';

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
        <>
          <button id="buttonBack"type="button" onClick={toEntrega} >Voltar</button>
          <LoadScript
             id="monitoring-map"
              googleMapsApiKey= {mapsKey}
          >
            <GoogleMap
              id='direction'
              mapContainerStyle={{
                height: '60vh',
                width: '100%'
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
          
        </>
    )
}