const sayHelloMiddleware = (store: any) => (next: any) => (action: any) => {
  console.log('Hello Middleware');
};
export default sayHelloMiddleware;
