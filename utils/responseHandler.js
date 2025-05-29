const sendResponse = (res, statusCode, data = null, message = null, results = null) => {

  const calculatedResults = results !== null ? results : 
    (Array.isArray(data) ? data.length : undefined);

  const response = {
    status: statusCode >= 200 && statusCode < 300 ? 'success' : 'fail'
  };

  if (calculatedResults !== undefined) {
    response.results = calculatedResults;
  }

  if (message) {
    response.message = message;
  }

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

module.exports = sendResponse;