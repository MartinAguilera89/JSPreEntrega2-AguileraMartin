//Socios de un club para saber condicion de pagos de cuotas.

function validarNumero(numero, mensaje){
    while(isNaN(numero)){
        alert("Ingresaste un valor no numerico, reintentalo")
        numero = parseInt(prompt(mensaje));
    } 
    return numero;
}

class Socio{
    constructor(id, nombre, nroSocio){
        this.id = id,
        this.nombre = nombre,
        this.nroSocio = nroSocio,
        this.cuotas = [],
        this.abono = ""
    }
}

class Cuotas{
    constructor(pago){
        this.pago = pago,
        this.fecha = new Date()
    }
}

const socio1 = new Socio(1,"Raul Ramirez", 10001)
const socio2 = new Socio(2,"Luis Luque", 10002)
const socio3 = new Socio(3,"Gaston Gonzalez", 10003)
const socio4 = new Socio(4,"Fernando Fernandez", 10004)
const socio5 = new Socio(5,"Martin Martinez", 10005)

const SOCIOS = [socio1,socio2,socio3,socio4,socio5]; 

function mensajeSocios(){
    let mensajePresentacion = "Estos son nuestros socios; ingrese ID para evaluar condicion: \n";
    SOCIOS.forEach(e => {
        mensajePresentacion += `${e.id} - ${e.nombre} nro de socio del club ${e.nroSocio} \n` 
    })

    let respuestaSocio = parseInt(prompt(mensajePresentacion));
    respuestaSocio = validarNumero(respuestaSocio, mensajePresentacion)
    return SOCIOS.find(elem => elem.id === respuestaSocio);
}

mensajeSocios()

function pagoCuota(socio){
    if (socio.cuotas.length == 3){return alert("El Socio ya tiene sus 3 cuotas pagas, tiene abono activo.")}
    let pago = parseInt(prompt(`Ingrese el valor de cuota numero ${socio.cuotas.length + 1 } del socio ${socio.nombre}`))
    pago = validarNumero(pago, `Ingrese el valor de cuota numero ${socio.cuotas.length + 1 } del socio ${socio.nombre}` )
    socio.cuotas.push(new Cuotas(pago))
}

const socioSeleccionado = mensajeSocios()
pagoAbono(socioSeleccionado);

pagoCuota(socioSeleccionado);
pagoCuota(socioSeleccionado);
pagoCuota(socioSeleccionado);

function pagoAbono(socio){
    if(socio.cuotas.length < 3 ){
        alert("Para ser condicion Abonado Activo, debes ingresar las 3 cuotas")
        return
    }

    let pagos = socio.cuotas.reduce((acumulador, elemento) => {
        return acumulador += elemento.pago;
    }, 0)

    let condicion = pagos/socio.cuotas.length;

    if (condicion >= 1500){
        socio.abono = "Abonado Activo"
    }else if(condicion >= 1){
        socio.abono = "Abonado Inactivo; Falta ponerse al dia con las cuotas"
    }else{
        socio.abono = "Abono dado de baja; no pago ninguna cuota"
    }

}
