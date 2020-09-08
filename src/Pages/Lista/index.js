import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import './stylePage2.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import api from '../../services/api';
import {Provider} from 'react-redux';
import store from '../../store/index';
import Armazena from '../../components/Armazena/index';


const StyledTableCell = withStyles((theme) => ({
  head: {
    
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const [entregas, setEntregas] = useState([]);
  const history=useHistory();
  ;
  useEffect(() =>{
      async function listagem(){
        const response = await api.get('/procura');
        setEntregas(response.data);
      }
      listagem();
  }, [])
  async function toCadastro(){
    await history.push('/');
  }
  
  
  return (
    <div id = "container">
      <div id = "containerButton">
        <button className = "buttonCadastro" type = "button" onClick={toCadastro}>Voltar para Cadastro</button>
      </div>
      <Provider store = { store }>
      <TableContainer id = "containerTable" component = { Paper }>
        <Table aria-label = "customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Cliente</StyledTableCell>
              <StyledTableCell align = "right" >Data de Entrega</StyledTableCell>
              <StyledTableCell align = "right" >Ponto de partida</StyledTableCell>
              <StyledTableCell align = "right" >Destino</StyledTableCell>
              <StyledTableCell align = "right" >Rota</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entregas.map( entrega => (
              <StyledTableRow key = { entrega._id }>
                <StyledTableCell component = "th" scope = "row">
                  { entrega.name }
                </StyledTableCell>
                <StyledTableCell align="right">{ entrega.dataEntrega }</StyledTableCell>
                <StyledTableCell align="right">{ entrega.pontoPartida }</StyledTableCell>
                <StyledTableCell align="right">{ entrega.pontoDestino}</StyledTableCell>
                <StyledTableCell align="right">
                  
                  <Armazena rota={ entrega }/>
                  
                </StyledTableCell>
              </StyledTableRow >
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
              
      </Provider>
    </div>
  );
}
