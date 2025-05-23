export const setAccion = (accion) => (req, res, next) => {
  req.accion = accion;
  next();
};