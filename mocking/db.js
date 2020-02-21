var faker = require("faker");
const db = {
  users: [
    {
      username: "chofer",
      password: Buffer.from("chofer").toString("base64"),
      role: "driver"
    },
    {
      username: "admin",
      password: Buffer.from("admin").toString("base64"),
      role: "admin"
    }
  ],
  retrasos: [
    "corte de ruta",
    "falla en el vehículo",
    "accidente",
    "incapacidad del chofer"
  ],
  recorridos: []
};

const cantidad_terminales = faker.random.number(100);
const terminales = new Array(cantidad_terminales).fill(null).map(() => ({
  nombre: faker.address.city()
}));

const trayectos = terminales.reduce((result, terminal) => {
  const cantidad_destinos = faker.random.number(5);
  const trayecto = new Array(cantidad_destinos).fill(null).map(() => {
    const destino = faker.random.arrayElement(terminales);
    return {
      origen: terminal,
      destino
    };
  });
  return [...result, ...trayecto];
}, []);

const cantidad_recorridos = faker.random.number(50);
const recorridos = new Array(cantidad_recorridos).fill(null).map(() => {
  const cantidad_trayectos = faker.random.number(10);
  const recorrido_trayectos = new Array(cantidad_trayectos).fill(null).reduce(
    (result, current) => {
      const siguiente = trayectos.find(t => t.origen == current.destino);
      return [...result, siguiente];
    },
    [faker.random.arrayElement(trayectos)]
  );
  const cantidad_trayectos = faker.random.number(10);
  const recorrido_viajes = [];
});

module.exports = db;
