import PriorityQueue from "./PriorityQueue";
import distanciaEntrePuntos from "./distanciaEntrePuntos";


export default function encontrarCamino(entradaX, entradaY, gondolax, gondolay, gondolas, numAncho, numLargo) {
    // Define las direcciones posibles (arriba, abajo, izquierda, derecha, y diagonales si, deseas)
    //console.log("entrada: " + entradaX + ":" +entradaY);
    //console.log("gondolas: " + gondolas);
    //console.log("gondola final: " + gondolax + ":" + gondolay);
    const direcciones = [
      [0, -1], // Arriba
      [0, 1],  // Abajo
      [-1, 0], // Izquierda
      [1, 0],  // Derecha
    ];
  
    // Define un conjunto de nodos visitados
    const nodosVisitados = new Set();
    // Define una cola de prioridad para los nodos abiertos
    const nodosAbiertos = new PriorityQueue();
    
  
    // Crea el nodo inicial
    const nodoInicial = {
      x: entradaX,
      y: entradaY,
      gCost: 0,
      hCost: distanciaEntrePuntos(entradaX, entradaY, gondolax, gondolay),
      parent: null,
      ocupada: false,
    };

    nodosAbiertos.enqueue(nodoInicial);
    //nodosAbiertos.push(nodoInicial);
  
    while (!nodosAbiertos.isEmpty()) {
        const nodoActual = nodosAbiertos.dequeue();
    
        if (nodoActual.x === gondolax && nodoActual.y === gondolay) {
          // Llegamos a la salida; reconstruye el camino
          const camino = [];
          let nodoActualAux = nodoActual;
    
          while (nodoActualAux !== null) {
            camino.unshift([nodoActualAux.x, nodoActualAux.y]);
            nodoActualAux = nodoActualAux.parent;
          }
    
          return camino;
        }
    
        nodosVisitados.add(`${nodoActual.x}-${nodoActual.y}`);

        for (const [dx, dy] of direcciones) {
          const nuevoX = nodoActual.x + dx;
          const nuevoY = nodoActual.y + dy;
          const ocupada = gondolas.find((gondola) => {
            //console.log("FOR nuevoX: " + nuevoX + " nuevoY: " + nuevoY + "gondola.ubicaciony: " + gondola.ubicaciony + "gondola.ubicaciony: " + gondola.ubicacionx)
            if(gondola.ubicacionx == gondolax && gondola.ubicaciony == gondolay){
                return false;
            } 
            return (
                nuevoX >= gondola.ubicacionx &&
                nuevoX < gondola.ubicacionx + gondola.ancho &&
                nuevoY >= gondola.ubicaciony &&
                nuevoY < gondola.ubicaciony + gondola.largo
              );
            });
            
            if (
              nuevoX >= 0 &&
              nuevoX < numAncho &&
              nuevoY >= 0 &&
              nuevoY < numLargo &&
              !nodosVisitados.has(`${nuevoX}-${nuevoY}`) &&
              !ocupada
            ) {
            //console.log("IF nuevoX: " + nuevoX + " nuevoY: " + nuevoY + "nodosVisitados.has(`${nuevoX}-${nuevoY}`): " + nodosVisitados.has(`${nuevoX}-${nuevoY}`) + "ocupada: " + ocupada)
            const gCost = nodoActual.gCost + 1;
            const hCost = distanciaEntrePuntos(nuevoX, nuevoY, gondolax, gondolay);
            const nodoVecino = {
              x: nuevoX,
              y: nuevoY,
              gCost,
              hCost,
              parent: nodoActual,
              ocupada: ocupada,
            };
    
            nodosAbiertos.enqueue(nodoVecino);
          }
        }
      }
  
    // No se encontró un camino
    return null;
  }