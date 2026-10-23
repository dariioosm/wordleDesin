function Teclado({onPulsar,colores}){
    const filas = ['QWERTYUIOP','ASDFGHJKLÑ','ZXCVBNM']
    return(
        <div className="teclado">
            {filas.map((fila,f)=>(
                <div className="fila-tecla"
                 key={f}>
                    {[...fila].map((    letra)=>(
                        <button 
                            className={`tecla ${colores[letra] || ''}`}
                            onClick={()=>onPulsar(letra)}
                        >
                        {letra}
                        </button>
                    ))}
                </div>
            ))

            }
        </div>
    )
}
export default Teclado