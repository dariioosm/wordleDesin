function Casilla({ letra, estado = '', activa, onCambio }) {
  return (
    <input
      className={`casilla ${estado}`}
      value={letra}
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
