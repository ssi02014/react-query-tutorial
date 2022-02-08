const sayHelloMiddleware = (store: any) => (next: any) => (action: any) => {
  console.log('Hello Middleware');

  return next(action);
};
export default sayHelloMiddleware;
