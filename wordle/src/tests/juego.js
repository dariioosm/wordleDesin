const COLUMNAS=5;
function estadoDe(fila, columna,solucion) {
  //TODO Subir la constante sobran con el resto de costs y realizar otro bucle para poder ir haciendo las comprobaciones restantes
  const sobran=[...solucion]; 
  for(let i=0; i<COLUMNAS;i++){
      if (fila[i] === sobran[i]){ 
        sobran[i]=null}
  }
  if(fila[columna]==solucion[columna]) return 'correcta'
  
  const indice = sobran.indexOf(fila[columna]);
  if (indice != -1) return 'presente'
  return 'ausente'
}
export default estadoDe