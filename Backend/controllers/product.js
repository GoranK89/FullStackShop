const addProduct = async (req, res) => {
  console.log(req.body);
  res.send("Add Product Route called, DB table not created yet");
};

module.exports = { addProduct };
