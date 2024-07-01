export default function ubicGondolaSeleccionada(gondolas, productosSeleccionados) {
    let gondolax = null;
    let gondolay = null;
    gondolas.map((gondola) => {
      productosSeleccionados.map((producto) => {
        if(gondola.id === producto.GondolaId && producto.ubicExacta === "derecha"){
          gondolax = gondola.ubicacionx+gondola.ancho;
          gondolay = gondola.ubicaciony;
          console.log(producto.nombre, gondolax, gondolay, producto.ubicExacta);
        } else if(gondola.id === producto.GondolaId && producto.ubicExacta === "izquierda") {
          gondolax = gondola.ubicacionx;
          gondolay = gondola.ubicaciony+gondola.largo-1;
          console.log(gondolax, gondolay);
        } else if(gondola.id === producto.GondolaId && producto.ubicExacta === "abajo") {
          gondolax = gondola.ubicacionx;
          gondolay = gondola.ubicaciony+gondola.largo;
          console.log(gondolax, gondolay);
        } else if(gondola.id === producto.GondolaId && producto.ubicExacta === "arriba") {
          gondolax = gondola.ubicacionx;
          gondolay = gondola.ubicaciony-1;
          console.log(gondolax, gondolay);
        } 
      })
    });
  
    return { gondolax, gondolay };
}
