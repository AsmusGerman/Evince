const jsonServer = require("json-server");
const server = jsonServer.create();
const jwt = require("express-jwt");

//#region dotenv configuration
const dotenv = require("dotenv");
const path = require("path").resolve(process.cwd(), "./mocking/.env");
const result = dotenv.config({ path });
if (result.error) {
  throw result.error;
}
//#endregion

const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.PORT;

/* datos */
const db = require("./db");
const router = jsonServer.router(db);
/* utils */
const middlewares = jsonServer.defaults();
//const { authorization } = require("./middlewares");

server.use(middlewares);
//server.use(authorization);
server.use(jsonServer.bodyParser);

/* ruteo */
//server.use("/api", jwt({ secret: SECRET_KEY }), router);

//#region authentication routes
/* const authentication = require("./controllers/authentication.controller")({
  users: db.users,
  secret: SECRET_KEY
});

server.route("/api/auth/login").post(authentication.login);

server.route("/api/auth/logout").post(authentication.logout);

server.route("/api/auth/register").post(authentication.register);
 */
//#endregion

//#region administrator routes
const administrator = require("./controllers/administrator.controller")({ db });

server.route("/api/administrator/recorridos")
  .get(administrator.recorridos.get);

server.route("/recorridos/suscribir")
  .post(administrator.recorridos.subscribe);

server.route("/recorridos/desuscribir")
  .post(administrator.recorridos.unsubscribe);

server
  .route("/reportes/rmr")
  .get(administrator.reportes.recorridosMasRetrasados);
//#endregion

//#region driver routes
const driver = require("./controllers/driver.controller")({ db });

server.route("/api/driver/recorridos").post(driver.recorridos.get);

server.route("/api/driver/recorridos/reporte").post(driver.recorridos.report);

server.route("/api/driver/retrasos").get(driver.retrasos.get);

server.route("/api/driver/retrasos").post(driver.retrasos.set);

server.route("/api/driver/viajes/start").post(driver.viajes.start);

server.route("/api/driver/viajes/stop").post(driver.viajes.stop);

//#endregion

server.listen(PORT, () => {
  console.log("JSON Server is running");
});
