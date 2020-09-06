const minLength = function (minLength, message) {
  return {
    validator: function (value) {
      return value.length >= minLength;
    },
    message: message,
  };
};

const maxLength = function (maxLength, message) {
  return {
    validator: function (value) {
      return value.length <= maxLength;
    },
    message: message,
  };
};

const valueIsArray = function (message) {
  return {
    validator: function (value) {
      return Array.isArray(value) && value.length > 0;
    },
    message: message,
  };
};

module.exports = { minLength, maxLength, valueIsArray };
