const jsonwebtoken = require("jsonwebtoken");
module.exports = function({ users, secret }) {
  function login(req, res) {
    const { username, password } = req.body;

    // se obtienen los usuarios y se busca
    const exists = Array.from(users).some(
      user => user.username == username && user.password == atob(password)
    );

    if (!exists) {
      res.sendStatus(500);
    } else {
      const token = jsonwebtoken.sign({ username }, secret, {
        expiresIn: "1h"
      });
      res.json({ token });
    }
  }

  function logout() {
    res.sendStatus(200);
  }

  function register(req, res) {
    const { username, password } = req.body;

    if (!/^[a-z]{2,20}$/gim.test(username)) {
      res.sendStatus(500).send("el nombre de usuario no tiene formato válido");
    } else if (!/^[a-z]{2,20}$/gim.test(password)) {
      res.sendStatus(500).send("la contraseña no tiene formato válido");
    } else {
      users.push({ username, password, role: "driver" });
      res.sendStatus(200);
    }
  }

  function profile(req, res) {
    res.json({ user });
  }

  return {
    login,
    logout,
    register
  };
};
