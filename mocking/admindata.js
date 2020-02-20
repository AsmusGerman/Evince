module.exports = () => {
    var faker = require("faker");
  
    const data = {
      auth: {
        register: {},
        login: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBlcGUgUmlxdWVsbWUifQ.byw88eOIZ9fE5Uc4vrqjWHm_mnk34uwRX4yYwMgSQJA",
          refreshToken: "",
          username: "pepe riquelme"
        },
        logout: {},
        role: 1
      },
      retrasos: [
        "corte de ruta",
        "falla en el vehículo",
        "accidente",
        "incapacidad del chofer"
      ],
      estados: [
        "delayed",
        "on the road",
        "not started"
      ],
      ciudades : new Array(10)
        .fill(null)
        .map(() => faker.address.city()),
      recorridos: []
    };

    const qr = faker.random.number({ min: 7, max: 10 });



    for (let i = 0; i < qr; i++) {

      const qv = faker.random.number({ min: 2, max: 3 });
      const cantDeCadaViaje = faker.random.number({min: 4, max: 6});

      const ciudades = new Array(qv + 1)
      .fill(null)
      .map(() => faker.address.city());

      const recorrido = {
        id: faker.random.number(),
        code: faker.random.alphaNumeric(10),
        origen: ciudades[0],
        destino: ciudades[ciudades.length-1],
        state: faker.random.arrayElement(data.estados),
        subscription : faker.random.boolean(),
        viajes: [],
        retrasos: []
      };
  
      for (let cant=0; cant < cantDeCadaViaje; cant++) {
        for (let j = 0; j < qv; j++) {
          const salida = faker.date.future(0);
          const viaje = {
            id: faker.random.alphaNumeric(10).toUpperCase(),
            cantPasajeros: faker.random.number(50),
            fechaHoraSalidaEstipuladas: salida.toLocaleString(),
            fechaHoraLlegadaEstipuladas: faker.date
              .future(0, salida)
              .toLocaleString(),
            estado: "pendiente",
            orden: j,
            trayecto: {
              id: faker.random.alphaNumeric(10),
              terminalOrigen: ciudades[j],
              terminalDestino: ciudades[j + 1]
            },
            retrasos: []
          };

          const qret = faker.random.number({ min: 0, max: 2 });
          for (let j = 0; j < qret; j++) {
            const retraso = {
                id: faker.random.alphaNumeric(10).toUpperCase(),
                tipo: faker.random.arrayElement(data.retrasos),
                descripcion: "",
                tiempo: faker.random.number({min: 10, max:20})
            };
            viaje.retrasos.push(retraso);
            recorrido.retrasos.push(retraso);
          }

          recorrido.viajes.push(viaje);
        }
      }

      data.recorridos.push(recorrido);
    }
    // data.recorridos[0].viajes.forEach(viaje => (viaje.estado = "proximo"));
    return data;
  };
  