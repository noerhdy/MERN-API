exports.createProduct = (req, res, next) => {
  res.json({
    message: "create broow!!!!",
    data: {
      id: 1,
      name: "produk",
      price: 15000,
    },
  });
  next();
};

exports.getAllProducts = (req, res, next) => {
  res.json({
    message: "create su",
    data: {
      id: 1,
      name: "produk",
      price: 5000,
    },
  });
  next();
};
