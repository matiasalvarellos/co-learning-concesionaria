const autos = require("./autos");



let concesionaria = {
  autos: autos,

  buscarAuto: function(patente){
    //necesitamos los autos
    let autos = this.autos

    let autoEncotrado = autos.find(function(auto){
      return auto.patente == patente
    })

    if(autoEncotrado){
      return autoEncotrado
    }
    return null
  },
  venderAuto: function(patente){

    let autoEncotrado = this.buscarAuto(patente);

    if(autoEncotrado){
      autoEncotrado.estado ="vendido"
      return autoEncotrado
    }
    return "no encontre nada"

  },
  autosParaLaVenta: function(){
    //obtener autos
    let autos = this.autos

    let autosParaVender = autos.filter(function(auto){
      return auto.estado == "en venta"
    })
    return autosParaVender    

  },
  autosNuevos: function(){
    let autosParaVender = this.autosParaLaVenta();

    let autosNuevos = autosParaVender.filter(function(auto){
      return auto.km < 100
    })

    return autosNuevos

  },
  listaDeVentas:function(){
    let autos = this.autos

    let autosVendidos = autos.filter(function(auto){
      return auto.estado == "vendido"
    })

    let listaDeVentas = autosVendidos.map(function(auto){
      return {
        marca: auto.marca,
        precio: auto.precio
      }
    })
    
    return listaDeVentas


  },
  totalVentas:function(){
    let listaDeVentas = this.listaDeVentas()

    let total = listaDeVentas.reduce(function(acum, elem){
      return acum + elem.precio
    }, 0)
    
    return total

  },
  puedeComprar:function(persona, auto){
    return persona.capacidadDePagoTotal >= auto.precio && persona.capacidadDePagoEnCuotas >= auto.cuotas
  },
  autosQuePuedeComprar:function(persona){
    let autosParaLaVenta = this.autosParaLaVenta()

    let quePuedoComprar = autosParaLaVenta.filter(function(auto){
      return concesionaria.puedeComprar(persona, auto)
    })
    
    return quePuedoComprar

  } 

}

let persona = {
  nombre: "matias",
  capacidadDePagoEnCuotas : 12000,
  capacidadDePagoTotal: 140000
}


console.log(concesionaria.buscarAuto(""))
console.log(concesionaria.totalVentas())
console.log(concesionaria.puedeComprar(persona, autos[0]))