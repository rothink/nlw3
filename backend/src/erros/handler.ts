import { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

interface ValidationErros {
  [key: string]: Array<string>;
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  console.error(error);
  if (error instanceof ValidationError) {
    const errors: ValidationErros = {};
    error.inner.forEach((err) => {
      errors[err.path] = err.errors;
    });
    return response.status(400).json({ message: "Validation fails", errors });
  }
  return response.status(500).json({ massage: "Erro interno no servidor" });
};

export default errorHandler;
