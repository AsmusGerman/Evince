const recorridos = function(db) {
  function get(req, res) {
    return res.json(db.recorridos);
  }

  function subscribe(req, res) {
    const { id, username } = req.body;
    const usuario = Array.from(db.users).find(
      user => user.username === username
    );
    if (!usuario) {
      res
        .sendStatus(500)
        .send("los datos del usuario no han podido ser modificados");
      return;
    }
    const existe = Array.from(db.recorridos).some(
      recorrido => recorrido.id === id
    );
    if (!existe) {
      res
        .sendStatus(500)
        .send("no existe el recorrido indicado, para realizar esta operacion");
      return;
    }
    usuario.recorridos.push(id);
    res.sendStatus(200);
  }

  function unsubscribe(req, res) {
    const { id, username } = req.body;
    const usuario = Array.from(db.users).find(
      user => user.username === username
    );
    if (!usuario) {
      res
        .sendStatus(500)
        .send("los datos del usuario no han podido ser modificados");
      return;
    }
    const idx = Array.from(usuario.recorridos).indexOf(bId => bId === id);
    if (idx < 0) {
      res
        .sendStatus(500)
        .send(
          "no existe una suscripcion asociada para realizar esta operacion"
        );
      return;
    }
    usuario.recorridos.splice(idx);
    res.sendStatus(200);
  }

  return {
    get,
    subscribe,
    unsubscribe
  };
};

const reportes = function(recorridos) {
  function recorridosMasRetrasados() {}
  return {
    recorridosMasRetrasados
  };
};

module.exports = function({ db }) {
  return { recorridos: recorridos(db), reportes: reportes(db) };
};
