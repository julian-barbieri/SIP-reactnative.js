export default function ubicGondolaSeleccionada(gondolas, productosSeleccionados) {
    let gondolax = null;
    let gondolay = null;
    gondolas.map((gondola) => {
      productosSeleccionados.map((producto) => {
        if(gondola.id === producto.GondolaId){
          gondolax = gondola.ubicacionx;
          gondolay = gondola.ubicaciony;
        }
      })
    });
    return { gondolax, gondolay };
}
