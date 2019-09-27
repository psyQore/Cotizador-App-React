import React, { Component } from "react";
import Header from "./Header";
import Formulario from "./Formulario";
import { obtenerDiferenciaAnio, calcularMarca, obtenerPlan } from "../helper";
import Resumen from './Resumen';
import Resultado from "./Resultado";

class App extends Component {
  
  state = {
    resultado: '',
    datos: {}
  };

  cotizarSeguro = datos => {
    const { marca, plan, year } = datos;

    // Agregar una base de 2000.
    let resultado = 2000;

    // Obtener la difrenecia de años y
    const diferencia = obtenerDiferenciaAnio(year);

    // Por cada año restar el 3% al valor del seguro
    resultado -= (diferencia * 3 * resultado) / 100;

    // Americano 15% Asiatico 5% y Europeo 30% de incremento del valor actual
    resultado = calcularMarca(marca) * resultado;

    // El plan del auto , basico incrementa el valoe 20% y cobertura completa 50%
    let incrementoPlan = obtenerPlan(plan);

    // Costo
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
  

    // crear objeto para el resumen
    const datosAuto = {
      marca: marca,
      plan: plan,
      year: year
    }

    this.setState({
      resultado: resultado,
      datos: datosAuto
    })

    console.log(resultado);
  };

  render() {
    return (
      <div className="contenedor">
        <Header titulo="Cotizador de Seguro de Auto" />
        <div className="contenedor-formulario">
          <Formulario cotizarSeguro={this.cotizarSeguro} />
          <Resumen 
            datos={this.state.datos}
          />
          <Resultado 
            resultado={this.state.resultado}
          />
        </div>
      </div>
    );
  }
}

export default App;
