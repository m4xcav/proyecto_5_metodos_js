let tareas = [{
  id: 1,
  tarea: 'tarea 1',
  done: false
},
{
  id: 2,
  tarea: 'tarea 2',
  done: false
},
{
  id: 3,
  tarea: 'tarea 3',
  done: false
}];
const tabla = document.getElementById('tcuerpo');
const inputTarea = document.getElementById('tarea');

//FUNCIONES
//generar un número "aleatorio" de 2 dígitos
function generarID() {
  return Math.floor(Math.random() * 90 + 10);
}

//agregar una nueva tarea
function agregarTarea() {
const vtarea = inputTarea.value.trim();
    if (vtarea !== '') {
      let nuevaID;
      do {
        nuevaID = generarID();
      } while (tareas.some(tarea => tarea.id === nuevaID));
  
      const nuevaTarea = {
        id: nuevaID,
        tarea: vtarea,
        done: false
      };
    tareas.push(nuevaTarea);
    inputTarea.value = '';
    mostrarTareas();
  }else{
    alert('por favor ingresar una tarea');
  }
}
//editar tareas
function actualizartarea(id) {
    const tarea = tareas.find(t => t.id === id);
      const idfinder = document.getElementById(`id`+id);
      if (idfinder.checked) {
        tarea.done = true;
      } else {
        tarea.done = false;
      }
      mostrarTareas();
  }
    // Función para contar tareas y tareas completadas
function tareasdone() {
  const totalTareas = tareas.length;
  const tareasCompletadas = tareas.filter(tarea => tarea.done).length;
  return { totalTareas, tareasCompletadas };
}
function tareastotales() {
  const { totalTareas, tareasCompletadas } = tareasdone();
  const contadorTotal = document.getElementById('total');
  const contadorCompletadas = document.getElementById('done');

  contadorTotal.textContent = totalTareas;
  contadorCompletadas.textContent = tareasCompletadas;
}
  
// Función para mostrar las tareas
function mostrarTareas() {
    let contenidoHTML = '';
    for (const tarea of tareas) {
      contenidoHTML += `
        <tr>
        <th scope="row">${tarea.id}</th>
        <td>${tarea.tarea}</td>
        <td><input class="form-check-input" type="checkbox" value="" id="id${tarea.id}" ${tarea.done ? 'checked' : ''} onclick="actualizartarea(${tarea.id})" ></td>
        <td><button class="btn btn-success" onclick="eliminarTarea(${tarea.id})">Eliminar</button></td>
        </tr>
      `;
    }
    tabla.innerHTML = contenidoHTML;
    tareasdone();
    tareastotales();
  }
  
  // Función para eliminar una tarea
  function eliminarTarea(id){
    tareas = tareas.filter(tarea => tarea.id !== id);
    inputTarea.value = '';
    mostrarTareas();
  }



// LLAMAR FUNCIONES
window.addEventListener('load', mostrarTareas);
document.getElementById('agregar').addEventListener('click', agregarTarea);