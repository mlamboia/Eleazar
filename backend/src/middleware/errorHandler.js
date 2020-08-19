errorHandler = (err, req, res, next) => {
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Você deve fornecer informações!',
    });
  }
};

module.exports = { errorHandler };
