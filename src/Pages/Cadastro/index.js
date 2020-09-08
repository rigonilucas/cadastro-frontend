import React, {useState} from 'react';
import { useHistory} from 'react-router-dom';
import api from '../../services/api';
import './style.css';
export default function Cadastro(){
    const [name, setClient]= useState('');
    const [dataEntrega, setDate]= useState('');
    const [pontoPartida, setFrom]= useState('');
    const [pontoDestino, setTo]= useState('');
    const history = useHistory();

    async function handleCadastro(e){
        e.preventDefault();

        const response = await api.post('/clientes', {
            name,
            dataEntrega,
            pontoPartida,
            pontoDestino,
        })
        history.push('/lista');
    }
    async function handleLista(){
        history.push('/lista');
    }
    return (
        <div id="container">
            
            <aside>
                <strong>Cadastrar</strong>
                
                <form onSubmit={handleCadastro}>
                    <div id="ContainerInput">
                        <label>Nome</label>
                        <input
                            required
                            value={name}
                            onChange={e => setClient(e.target.value)}
                        />  
                    </div>

                    <div id="ContainerInput">
                        <label>Data de Entrega</label>
                        <input 
                            required
                            value={dataEntrega}
                            onChange={e => setDate(e.target.value)}
                        />
                    </div>

                    <div id="ContainerInput">
                        <label>Ponto de Partida</label>
                        <input
                            required
                            value={pontoPartida}
                            onChange={e => setFrom(e.target.value)}
                        />  
                    </div>

                    <div id="ContainerInput">
                        <label>Destino</label>
                        <input
                            required
                            value={pontoDestino}
                            onChange={e => setTo(e.target.value)}
                        />  
                    </div>

                    <button type="submit">Cadastrar</button>
                </form>
            </aside>
            <div id="containerButton">
                <button className="button-list" type="button" onClick={handleLista}>Entregas</button>
            </div>
        </div>
    );
}