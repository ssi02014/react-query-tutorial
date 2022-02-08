const sayByeMiddleware = (store: any) => (next: any) => (action: any) => {
  console.log('Bye Middleware');

  return next(action);
};
export default sayByeMiddleware;
