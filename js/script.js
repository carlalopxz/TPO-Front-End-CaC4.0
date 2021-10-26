const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
	nombre: /^[a-zA-Z0-9\_\-]{1,16}$/, // Letras, numeros, guion y guion_bajo
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	celular: /^.{10,11}$/, // 11 a 11 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = {
    nombre: false,
    apellido: false,
    celular: false,
    correo: false,
    diaDeTurno:false,
    servicios:false
};

const validadFormulario = (e) => {
    switch(e.target.name){
        case "nombre":
            validarCampoUno(expresiones.nombre, e.target, "nombre");
            validarCampoDos(expresiones.nombre,e.target,"#divNombre");
        break;
        case "apellido":
            validarCampoUno(expresiones.apellido, e.target, "apellido");
            validarCampoDos(expresiones.apellido,e.target,"#divApellido");
        break;
        case "celular":
            validarCampoUno(expresiones.celular, e.target, "celular");
            validarCampoDos(expresiones.celular,e.target,"#divCelular");
        break;
        case "correo":
            validarCampoUno(expresiones.correo, e.target, "correo");
            validarCampoDos(expresiones.correo,e.target,"#divCorreo");
        break;
        case "diaDeTurno":
            validarFecha("diaDeTurno",e.target);
        break;
        case "horaDeTurno":
            validadHora(e.target);
        break;
        case "check":
            validarServicios(e.target);
       break;
    }
};  

const validarCampoUno  = (expresion,input,campo) => {
    if(expresion.test(input.value)){
        document.getElementById(campo).classList.remove("formularioIncorrecto");
        document.getElementById(campo).classList.add("formularioCorrecto");
        campos[campo] = true;
    }else{
        document.getElementById(campo).classList.add("formularioIncorrecto");
        document.getElementById(campo).classList.remove("formularioCorrecto");
    }
};

const validarCampoDos = (expresion,input,campo) => {
    if(expresion.test(input.value)){
        campos[campo] = true;
        document.querySelector(`${campo} .mensajeError`).classList.remove("mensajeErrorActivo");
    }else{
        document.querySelector(`${campo} .mensajeError`).classList.add("mensajeErrorActivo");
    }
};

const validarFecha = (campo,inputFecha) =>{
    if(Date.parse(inputFecha.value)){
        let fecha = document.getElementById(campo);
        let fecha2 = new Date(fecha.value);
        let dia = (new Date(fecha.value)).getDay();
        let hora = fecha2.toLocaleTimeString(navigator.language, {
            hour: '2-digit',
            minute:'2-digit'
          });
        if((dia == 5 || dia == 6) || (hora > "16:01" || hora < "07:59")){
            document.getElementById(campo).classList.add("formularioIncorrecto");
            document.getElementById(campo).classList.remove("formularioCorrecto");
            document.querySelector("#divDiaDeTurno .mensajeError").classList.add("mensajeErrorActivo");
        }else{
            document.getElementById(campo).classList.add("formularioCorrecto");
            document.getElementById(campo).classList.remove("formularioIncorrecto");
            document.querySelector("#divDiaDeTurno .mensajeError").classList.remove("mensajeErrorActivo");
            campos[campo] = true;
        }

    }
}

const validarServicios = (campo) => {
    let checkbox = document.querySelectorAll(".form-check-input");
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked){
            campos[campo] = true;
        }
    };
};

inputs.forEach((input) => {
    input.addEventListener("keyup", validadFormulario)
    input.addEventListener("blur", validadFormulario)
});


formulario.addEventListener("submit", () => {
    if(campos.nombre && campos.apellido && campos.celular && campos.correo && campos.diaDeTurno && campos.servicios){
        formulario.reset();
    }
});