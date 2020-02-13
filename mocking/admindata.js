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
      recorridos: []
    };
  
    const qr = faker.random.number({ min: 2, max: 3 });
    for (let i = 0; i < qr; i++) {
      const recorrido = {
        id: faker.random.number(),
        name: faker.random.alphaNumeric(10),
        //viajes : [],
        retrasos: []
      };
  
      /* const qv = faker.random.number({ min: 2, max: 2 });
      const ciudades = new Array(qv + 1)
        .fill(null)
        .map(() => faker.address.city());
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
            terminalOrigen: ciudades[i],
            terminalDestino: ciudades[i + 1]
          }
        };
        recorrido.viajes.push(viaje);
      }
 */
      const qret = faker.random.number({ min: 2, max: 10 });
      for (let j = 0; j < qret; j++) {
        const retraso = {
            id: faker.random.alphaNumeric(10).toUpperCase(),
            tipo: faker.random.arrayElement(data.retrasos),
            descripcion: "",
            tiempo: faker.random.number(15)
        };
        recorrido.retrasos.push(retraso);
      }

      data.recorridos.push(recorrido);
    }
    // data.recorridos[0].viajes.forEach(viaje => (viaje.estado = "proximo"));
    return data;
  };
  