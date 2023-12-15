import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/errors';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources = Object.values(err?.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
