const errorHandler = (err, req, res, next) => {
  console.log(err);
  const { name, errors } = err;
  let statusCode = 500;
  let message = "Internal Server Error";

  if (
    name === "SequelizeValidationError" ||
    name === "SequelizeUniqueConstraintError"
  ) {
    statusCode = 400;
    message = errors.map(({ message }) => message);
  } else if (name === "Email/PasswordEmpty") {
    statusCode = 400;
    message = "Email / Password is required";
  } else if (name === "UserNotFound") {
    statusCode = 401;
    message = "Invalid email/password";
  } else if (name === "MountainNotFound") {
    statusCode = 404;
    message = "Mountain Not Found";
  } else if (name === "invalidToken" || name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Access Token is Invalid";
  } else if (name === "QuotaNotFound") {
    statusCode = 400;
    message = "Quota Not Found";
  } else if (name === "QuotaExceed") {
    statusCode = 400;
    let sisaQuota = err.quotaRemain;
    message = `Quota Only Remain ${sisaQuota} left`;
  } else if (name === "BadInput") {
    statusCode = 400;
    message = "Make Sure Your Input is Correct";
  } else if (name === "LicenseNotFound") {
    statusCode = 400;
    message = "License Not Found";
  } else if (name === "Forbidden") {
    statusCode = 403;
    message = "Forbidden";
  }

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
