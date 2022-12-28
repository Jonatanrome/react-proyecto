import React, { Component } from 'react';

import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }

  paginaAnterior = () => {
    // leer el state de la pagina actual
    let pagina = this.state.pagina;

    // si la pagina es 1 ya no ir hacia atras
    if(pagina === 1) return null;

    // resta uno a la pagina actual
    pagina -=1

    // agregar el cambio al state
    this.setState({
      pagina
    });

    console.log(pagina);
  }


paginaSiguiente = () => {
  // leer el state de la pagina actual
  let pagina = this.state.pagina;

  // sumar uno a la pagina actual
  pagina = +1

  // agregar el cambio al state
  this.setState({
    pagina
  });

  console.log(pagina);
}

consultarApi = () => {
  const termino = this.state.termino;

  const url = `https://pixabay.com/api/?key=32281130-1b14bdfca1209dea726f0d4f1&q=${termino}&per_page30`;

  fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => this.setState({ imagenes: resultado.hits }))

}

datosBusqueda = (termino) => {
  this.setState({
    termino: termino,
    pagina: 1

  }, () => {
    this.consultarApi();
  })
}

render() {
  return (
    <div className="App container">
      <div className='jumbotron'>
        <p className='lead text-center'>Buscador de imagenes</p>

        <Buscador
          datosBusqueda={this.datosBusqueda}
        />


      </div>
      <div className='row justify-content-center'></div>
      <Resultado
        imagenes={this.state.imagenes}
        paginaAnterior={this.paginaAnterior}
        paginaSiguiente={this.paginaSiguiente}
      />
    </div>
  );
}
}

export default App;
