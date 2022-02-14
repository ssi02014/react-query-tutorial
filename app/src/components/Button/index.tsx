import React from 'react';
import * as S from './style';

const Button = () => {
  return <S.DefaultButton>버튼입니다.</S.DefaultButton>;
};

Button.red = () => {
  return <S.RedButton>버튼입니다.</S.RedButton>;
};

export default Button;
