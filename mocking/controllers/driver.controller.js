const recorridos = function(db) {
  function get(req, res) {
    res.json(db.recorridos);
  }

  function report(req, res) {
    const { id } = req.body;
    const recorrido = Array.from(db.recorridos).find(
      recorrido => recorrido.id == id
    );
    if (!recorrido) {
      res.sendStatus(500);
      return;
    }
    res.json({ reporte: recorrido });
  }

  return {
    get,
    report
  };
};

const viajes = function(db) {
  function start(req, res) {
    const { recorridoId, viajeId } = req.body;
    const recorrido = Array.from(db.recorridos).find(r => r.id === recorridoId);
    if (!recorrido) {
      res.sendStatus(500).send("no existe el recorrido");
      return;
    }
    const viaje = Array.from(recorrido.viajes).find(
      viaje => viaje.id === viajeId
    );
    if (!viaje) {
      res.sendStatus(500).send("no existe el viaje");
      return;
    }
    viaje.estado = "activo";
    res.sendStatus(200);
  }

  function stop(req, res) {
    const { recorridoId, viajeId } = req.body;
    const recorrido = Array.from(db.recorridos).find(r => r.id === recorridoId);
    if (!recorrido) {
      res.sendStatus(500).send("no existe el recorrido");
      return;
    }
    const viaje = Array.from(recorrido.viajes).find(
      viaje => viaje.id === viajeId
    );
    if (!viaje) {
      res.sendStatus(500).send("no existe el viaje");
      return;
    }
    viaje.estado = "detenido";
    res.sendStatus(200);
  }

  return {
    start,
    stop
  };
};

const retrasos = function(db) {
  function set(req, res) {
    const { recorridoId, viajeId, tipo, duracion, observacion } = req.body;
    const recorrido = Array.from(db.recorridos).find(r => r.id === recorridoId);
    if (!recorrido) {
      res.sendStatus(500).send("no existe el recorrido");
      return;
    }
    const viaje = Array.from(recorrido.viajes).find(
      viaje => viaje.id === viajeId
    );
    if (!viaje) {
      res.sendStatus(500).send("no existe el viaje");
      return;
    }
    viaje.recorridos.push({
      tipo,
      duracion,
      observacion
    });
    res.sendStatus(200);
  }

  function get(req, res) {
    const { recorridoId, viajeId } = req.body;
    const recorrido = Array.from(db.recorridos).find(r => r.id === recorridoId);
    if (!recorrido) {
      res.sendStatus(500).send("no existe el recorrido");
      return;
    }
    const viaje = Array.from(recorrido.viajes).find(
      viaje => viaje.id === viajeId
    );
    if (!viaje) {
      res.sendStatus(500).send("no existe el viaje");
      return;
    }
    res.json({ retrasos: viaje.retrasos });
  }

  return {
    set,
    get
  };
};

module.exports = function({ db }) {
  return {
    recorridos: recorridos(db.recorridos),
    viajes: viajes(db.recorridos),
    retrasos: retrasos(db.recorridos)
  };
};
