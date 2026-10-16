export function estadoDe(fila, columna, solucion) {
  const sobran = [...solucion];

  for (let i = 0; i < solucion.length; i++) {  // ← cambia COLUMNAS por solucion.length
    if (fila[i] === sobran[i]) {
      sobran[i] = null;
    }
  }

  if (fila[columna] === solucion[columna]) return 'correcta';

  const indice = sobran.indexOf(fila[columna]);
  if (indice !== -1) return 'presente';

  return 'ausente';
}