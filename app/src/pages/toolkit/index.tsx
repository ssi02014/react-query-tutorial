import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {
  decrease,
  divide,
  increase,
  multiple,
} from '../../features/calculate/calculateSlice';

const ToolkitPage = () => {
  const { number } = useSelector((state: RootState) => state.calculate);
  const dispatch = useDispatch();

  const onIncrease = useCallback(() => {
    dispatch(increase());
  }, [dispatch]);

  const onDecrease = useCallback(() => {
    dispatch(decrease());
  }, [dispatch]);

  const onMultiple = useCallback(() => {
    dispatch(multiple(2));
  }, [dispatch]);

  const onDivide = useCallback(() => {
    dispatch(divide(2));
  }, [dispatch]);

  return (
    <>
      <div>리덕스 툴킷(동기) 튜토리얼 페이지</div>
      <div>{number}</div>
      <div>
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
        <button onClick={onMultiple}>x2</button>
        <button onClick={onDivide}>/2</button>
      </div>
    </>
  );
};

export default ToolkitPage;
