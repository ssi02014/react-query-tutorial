import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface Props {
  color: string;
}
const ComponentOne = forwardRef(({ color }: Props, ref: any) => {
  return <Wrapper color={color} ref={ref}></Wrapper>;
});

const Wrapper = styled.div<{ color: string }>`
  height: 700px;
  background-color: ${({ color }) => color};
`;

export default ComponentOne;
