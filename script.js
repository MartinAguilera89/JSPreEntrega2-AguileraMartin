// SITIO PARA SOCIOS DE UN CLUB

function validarNumero(numero, mensaje){
    while(isNaN(numero)){
        alert("No ingresaste un valor numerico valido. Intentar nuevamente")
        numero = parseInt(prompt(mensaje));
    } 
    return numero;
}
//Class constructor objetos Socio
class Socio{
    constructor(id, apellido, nroSocio){
        this.id = id,
        this.apellido = apellido,
        this.nroSocio = nroSocio,
        this.cuotas = [],
        this.condicion = ""
    }
}

const socio1 = new Socio(1,"Gonzalez Federico", 4500)
const socio2 = new Socio(2,"Garcia Roberto", 3200)
const socio3 = new Socio(3,"Ramirez Alan", 1700)
const socio4 = new Socio(4,"Lopez Lorena", 5100)

const SOCIOS = [socio1,socio2,socio3,socio4];


function inicioRegistro(){
//     //Creamos mensaje inicial a mostrar
    let mensajeRegistro = "Estos son los socios registrados; Selecciona tu ID para reservar tu proxima entrada \n";
    SOCIOS.forEach(e => {
        mensajeRegistro += `${e.id} - ${e.apellido} nro de socio ${e.nroSocio} \n` 
    })

    let respuestaSocio = parseInt(prompt(mensajeRegistro));
    respuestaSocio = validarNumero(respuestaSocio, mensajeRegistro)
    return SOCIOS.find(elem => elem.id === respuestaSocio);
}

function revisionAbono(socio){
    if (socio.cuotas.length == 3){ return alert("El Socio se encuentra al dia con el abono. Puede reservar entradas para los proximos partidos")}

    let abono = parseInt(prompt(`Ingrese el nro de bimestre ${socio.cuotas.length + 1 } abonado por el socio ${socio.apellido} \n 1 - enero/febrero \n 2 - marzo/abril \n 3 - mayo/junio 8 - NO ABONE NINGUN BIMESTRE MAS \n 9 - NO TENGO NINGUN BIMESTRE ABONADO EN EL AÑO `))
    abono = validarNumero(abono, `Ingrese el nro de bimestre ${socio.cuotas.length + 1 } abonado por el socio ${socio.apellido} \n 1 - enero/febrero \n 2 - marzo/abril \n 3 - mayo/junio 8 - NO ABONE NINGUN BIMESTRE MAS \n 9 - NO TENGO NINGUN BIMESTRE ABONADO EN EL AÑO ` )
    socio.cuotas.push(abono)
}

function revisionCondicion(socio){
    if(socio.cuotas.length < 3 ){
        alert("Debe ingresar si tiene los abonos realizados")
        return
    }

    //Evalua la condicion del socio

    let abonos = socio.cuotas.reduce((acumulador, elemento) => {
        return acumulador += elemento.abono;
    }, 0)

    let statusRegitro = abonos/socio.cuotas.length;

    if (statusRegitro == 6){
        socio.condicion = "Tu condicion de socio es ACTIVO: podes sacar entradas para cualquier partido del mes"
    }else if(statusRegitro > 6){
        socio.condicion = "Tu condicion de socio es CADETE: podes sacar entrada solamente para el siguiente partido, debes ponerte al dia con los abonos"
    }else{
        socio.condicion = "Tu condicion de socio es INACTIVO: NO podes sacar entradas, debes ponerte al dia con los pagos."
    }
}

