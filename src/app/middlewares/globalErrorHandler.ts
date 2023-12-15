import { ErrorRequestHandler } from 'express';
import handleValidationError from '../errors/handleValidationError';
import { TErrorSources } from '../interface/errors';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'something went wrong';
  let errorSource: TErrorSources = [
    {
      path: '',
      message: 'something went wrong!',
    },
  ];

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    err,
  });
};

export default globalErrorHandler;
