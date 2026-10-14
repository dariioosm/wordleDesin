import { useEffect, useState } from 'react'
import Casilla from './components/casilla/Casilla.jsx'

/*
  TODO usar borrar(backspace) cuando casilla vacía, para ir a casilla anterior
  */

const FILAS = 6
const COLUMNAS = 5
const SOLUCION=""
const SOLUCIONES = ["PERRO","CABRA","GALLO","CEBRA","BURRO"]
//* Crea un tablero vacío: 6 filas de 5 letras en blanco
function tableroVacio() {
  const tablero = []
  for (let f = 0; f < FILAS; f++) {
    tablero.push(Array(COLUMNAS).fill(''))
  }
  return tablero
}

//* Decide el color de una letra ya comprobada
function estadoDe(letra, columna,SOLUCION) {
  if (SOLUCION[columna] === letra) return 'correcta'
  if (SOLUCION.includes(letra)) return 'presente'
  return 'ausente'
}

function App() {
  const [intentos, setIntentos] = useState(tableroVacio())
  const [filaActual, setFilaActual] = useState(0)
  const[SOLUCION, setSolucion]= useState(()=>palabraNueva()); 
  //? utilizo la arrow func para que se ejecute la obtencion de la palabra nueva y use el resultado.
  //? solo la primera vez que se crea el componente despues lo llamo en la funcion para reiniciar el juego

  const [mensaje,setMensaje]=useState('');
  //? constante para poder enviar mensaje y utilizacion del useState para poder modificarlo cuando cambie el estado pertinente
  const ultimo = filaActual > 0 ? intentos[filaActual - 1].join('') : ''
  const ganada = ultimo === SOLUCION
  const terminada = ganada || filaActual === FILAS

  useEffect(() => {
    //* Lleva el cursor a la primera casilla en la que se puede escribir
    document.querySelector('.casilla:enabled')?.focus()
  }, [filaActual])


  function cambiarLetra(f, c, evento) {
    const letra = evento.target.value.toUpperCase()
    //* Solo aceptamos una letra, o nada si se ha borrado
    if (!/^[A-ZÑ]?$/.test(letra)) return

    //* Copiamos el tablero, cambiamos la copia y la guardamos
    const copia = intentos.map((fila) => [...fila])
    copia[f][c] = letra
    setIntentos(copia)

    //* Después de escribir una letra, pasamos a la casilla siguiente
    if (letra !== '') evento.target.nextElementSibling?.focus()

  }
  //? Funcion reiniciar partida
  function reiniciar(){
    //! set intentos llama a tablero vacio para crear la matriz vacía
    //! set fila guarda el valor de la fila actual y como va de 0 a max, se setea a 0
    setIntentos(tableroVacio());
    setFilaActual(0);
    setSolucion(palabraNueva());
  }

  function palabraNueva(){
    let indice = Math.floor(Math.random()*SOLUCIONES.length);
    let solucion='';
    solucion = SOLUCIONES[indice];
    return solucion
  }

  function comprobar(evento) {
    //* Evita que el navegador recargue la página al enviar el formulario
    evento.preventDefault()
    if (terminada) return
    //* No se puede comprobar una fila incompleta
    if (intentos[filaActual].includes('')){
      setMensaje("Faltan letras")
      return
      
    }
      
    setFilaActual(filaActual + 1)
  }

 return (
    <form className="juego" onSubmit={comprobar}>
      <h1>Wordle</h1>
      <div className="tablero">
        {intentos.map((fila, f) => (
          <div className="fila" key={f}>
            {fila.map((letra, c) => (
              <Casilla
                key={c}
                letra={letra}
                estado={f < filaActual ? estadoDe(letra, c,SOLUCION) : ''}
                activa={f === filaActual && !terminada}
                onCambio={(evento) => cambiarLetra(f, c, evento)}
              />
            ))}
          </div>
        ))}
      </div>
      {mensaje && <p className='alerta'>{mensaje}</p> }
      {terminada ? (
        <>
          <p className="mensaje" role="status">
            {ganada
              ? '¡Enhorabuena, has acertado!'
              : `La palabra era ${SOLUCION}`}
          </p>
          <button className='boton' onClick={reiniciar}>Nueva partida</button>
        </>
      ) : (
        <button className="boton" type="submit">
          Comprobar
        </button>
      )}
    </form>
  )
}

export default App

