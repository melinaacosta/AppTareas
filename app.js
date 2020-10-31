const fs = require("fs"); // sirve para importar archivos a este
const process = require("process");

let tareasJSON = fs.readFileSync("./tareas.json", "utf8");
let arrayDeTareas = JSON.parse(tareasJSON);


let comandoDelUsuario = process.argv[2];
switch (comandoDelUsuario) {
	case "listarTareas":
		console.log("Este es el listado de tareas que existen");
		console.log("----------------------------------------");
		for (let i = 0; i < arrayDeTareas.length; i++) {
			console.log((i + 1) + ". " + arrayDeTareas[i].titulo);
		}
		break;
	case "crearTarea":
		let nuevaTarea = {
			"titulo": process.argv[3],
			"estado": "pendiente"
		}
		arrayDeTareas.push(nuevaTarea) // primero agrego la tarea nueva al json de tareas pero sigue en objeto liteal osea en json hay que pasarlo a array
		let arrayStringuify = JSON.stringify(arrayDeTareas,null,2) //tengo que guardar el array en formato de string
		fs.writeFileSync("./tareas.json",arrayStringuify)
		console.log("se ha creado una nueva tarea")
		break;
	case "filtrarTareas":
		let tareasFiltradas = arrayDeTareas.filter(function(elemento){
			return process.argv[3] == elemento.estado
		});
		console.log(tareasFiltradas)
		break;
	case undefined:
		console.log('Tenés que pasarme una acción');
		break;
	default:
		console.log('No entiendo qué me estás pidiendo 😖');
}
