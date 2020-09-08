import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
export default function CourseList(rota){
    const from = useSelector(store => store.from);
    const to = useSelector(store => store.to);
    const history = useHistory();
    const dispatch = useDispatch();
    console.log(rota.rota.pontoPartida);
     function addRotaAction(from, to) {
        return { type: 'ADD_ROTA', from, to }
      }
    
      const addRota = ( from, to ) => {
        dispatch(addRotaAction( from, to ))
        console.log(from);
        console.log(to);
        history.push('/mapa');
    }
    return(    
        <button type = "button" onClick={ routes => (addRota(rota.rota.pontoPartida, rota.rota.pontoDestino )) }>Ver Rota</button>
    );
}