const autos = require("./autos");

let concesionaria = {
   autos: autos,
   buscarAuto: function(patente){
      for (i = 0; i < this.autos.length; i++){
         if (this.autos[i].patente == patente){
            return this.autos[i];
         }
      }
      return null
    },

   venderAuto: function(patente){
      const autoEncontrado = this.buscarAuto(patente);

      if (autoEncontrado){
        autoEncontrado.vendido = true;
      }
    },

    autosParaLaVenta: function(){
      const autosParaLaVenta = this.autos.filter(function(auto){
         return  auto.vendido == false;
        })
        return autosParaLaVenta
    },

    autosNuevos: function(){
        const autosParaLaVenta = this.autosParaLaVenta();

        const autosNuevos = autosParaLaVenta.filter(function(auto){
            return auto.km < 100
        })
        return autosNuevos
    },

    listaDeVentas: function(){
        let precios = [];

        this.autos.forEach(function(auto){
            if (auto.vendido == true){
                precios.push(auto.precio);
            }
        })
        return precios
    },

    totalDeVentas: function(){
        let listaDeVentas = this.listaDeVentas();

        const total = listaDeVentas.reduce(function(acum, valor){
           return acum + valor;
        }, 0);
        return total;
    },

puedeComprar: function(auto, persona){
        let resultadoDePagoCuotas = persona.capacidadDePagoEnCuotas >= (auto.precio / auto.cuotas);
        return (persona.capacidadDePagoTotal >= auto.precio) && resultadoDePagoCuotas
    },

    autosQuePuedeComprar: function(persona){
        const autosParaVender = this.autosParaLaVenta();

        const autosQuePuedeComprar = autosParaVender.filter(function(auto){
            return concesionaria.puedeComprar(auto, persona)
        })
        return autosQuePuedeComprar
    },
}

