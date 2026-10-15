function Casilla({ letra, estado = '', activa, onCambio,fila,columna }) {
  //? recoge los props del app.jsx y se guarda en constante etiqueta para que el componente
  //? pueda indicarle al lector de pantalla posicion en la matriz y si esta o no la letra y si está en posicion exacta
  const etiqueta = `Fila ${fila}, Columna ${columna} ${estado? `,${estado}`:''}`
  return (
    <input
      className={`casilla ${estado}`}
      value={letra}
      aria-label={etiqueta}
      maxLength={1}
      disabled={!activa}
      onKeyDown={(evento)=>{
        //? el on key down es para detectar tecla presionada
        if(evento.key=="Backspace" && !evento.target.value){
          //? si la tecla es backspace (retroceso) y no tiene contenido que haga lo pedido
          if(evento.target.previousElementSibling){
            //? si el evento encuentra un elemento hermano que sea anterior al actual
            evento.target.previousElementSibling.focus();
            //? se hace focus en el elemento anterior 
          }
        }
      }}
      onChange={onCambio}
    />
  )
}

export default Casilla
