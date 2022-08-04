import { isRejected } from '@reduxjs/toolkit';

const errorMiddleware = (store: any) => (next: any) => (action: any) => {
  if (isRejected(action)) {
    console.log('에러 발생 감지');
  }

  return next(action);
};
export default errorMiddleware;
