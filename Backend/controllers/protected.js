const { isAuth } = require("../isAuth");

const protected = async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      res.send({
        data: "You are viewing a protected route",
      });
    }
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};

module.exports = { protected };
