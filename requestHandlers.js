const handleAllRequests = (req, res, next) => {
  if (!["/geo/"].some((path) => req.path.includes(path)))
    return res.status(401).send("Unauthorized");

  next();
};

const handleGeoCodeRequest = (req, res, next) => {
  if (!req.params?.city || !req.params?.state) {
    console.log(
      `[${req.method}]  ${
        req.headers["x-forwarded-for"] || req.ip
      } - (ERROR: Requested data: City: ${req.params.city}, State: ${req.params.state} )`
    );
    return res.send({ ERROR: "Enter city/state in the URL. Example: /geo/lasvegas/nevada" });
  }
  console.log(
    `[${req.method}] ${req.headers["x-forwarded-for"] || req.ip} - (Requested data: City: ${
      req.params.city
    }, State: ${req.params.state})`
  );
  next();
};

module.exports = { handleAllRequests, handleGeoCodeRequest };
