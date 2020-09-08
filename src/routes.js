import {BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';

import cadastro from './Pages/Cadastro';
import lista from './Pages/Lista/index';
import mapa from './Pages/Mapa/index';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={cadastro}/>
                <Route path="/lista" component={lista}/>
                <Route path="/mapa" component={mapa}/>
            </Switch>
        </BrowserRouter>
    )
}