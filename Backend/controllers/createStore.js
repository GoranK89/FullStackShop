const createStore = async (req, res) => {
  console.log(req.body);
  res.send("Create Store POST route was called");
};

module.exports = { createStore };
