errorHandler = (err, req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: err,
      message: 'Você deve fornecer informações!',
    });
  }

  if (err && err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: err,
      message: `Esse ja existe`,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      error: err,
      message: 'Falha ao executar o comando!',
    });
  }

  next.end();
};

module.exports = errorHandler;
