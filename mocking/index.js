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
      role: 2
    },
    retrasos: [
      "corte de ruta",
      "falla en el vehículo",
      "accidente",
      "incapacidad del chofer"
    ],
    recorridos: []
  };

  const qr = faker.random.number({min: 2, max: 15});

  for (let i = 0; i < qr; i++) {
    const recorrido = {
      id: faker.random.number(),
      name: faker.random.alphaNumeric(10),
      orden: i,
      viajes: []
    };

    const qv = faker.random.number({min: 2, max: 10});
    for (let j = 0; j < qv; j++) {
      const salida = faker.date.future(0);
      const viaje = {
        id: faker.random.alphaNumeric(10).toUpperCase(),
        cantPasajeros: faker.random.number(50),
        fechaHoraSalidaEstipuladas: salida.toLocaleString(),
        fechaHoraLlegadaEstipuladas: faker.date.future(0, salida)
          .toLocaleString(),
        estado: "pendiente",
        orden: j,
        trayecto: {
          id: faker.random.alphaNumeric(10),
          terminalOrigen: faker.address.city(),
          terminalDestino: faker.address.city()
        },
        retrasos: []
      };
      recorrido.viajes.push(viaje);
    }
    data.recorridos.push(recorrido);
  }
 // data.recorridos[0].viajes.forEach(viaje => (viaje.estado = "proximo"));
  return data;
};
