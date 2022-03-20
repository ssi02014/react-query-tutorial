import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import ComponentOne from '../../components/ScrollComponent/ComponentOne';

const ScrollDomPage = () => {
  const component1 = useRef<HTMLDivElement>(null);
  const component2 = useRef<HTMLDivElement>(null);
  const component3 = useRef<HTMLDivElement>(null);
  const component4 = useRef<HTMLDivElement>(null);
  const component5 = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((num: number) => {
    switch (num) {
      case 1:
        if (component1.current)
          component1.current.scrollIntoView({ behavior: 'smooth' });

        break;
      case 2:
        if (component2.current) {
          window.scrollTo(0, component2.current.getBoundingClientRect().y);
        }
        break;
      case 3:
        if (component3.current) {
          component3.current.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 4:
        if (component4.current)
          component4.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 5:
        if (component5.current)
          component5.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        return;
    }
  }, []);
  return (
    <div>
      <nav>
        <NavList>
          <li>
            <button onClick={() => handleScroll(1)}>Component1</button>
          </li>
          <li>
            <button onClick={() => handleScroll(2)}>Component2</button>
          </li>
          <li>
            <button onClick={() => handleScroll(3)}>Component3</button>
          </li>
          <li>
            <button onClick={() => handleScroll(4)}>Component4</button>
          </li>
          <li>
            <button onClick={() => handleScroll(5)}>Component5</button>
          </li>
        </NavList>
      </nav>
      <div>
        <ComponentOne color="red" ref={component1} />
        <ComponentOne color="green" ref={component2} />
        <ComponentOne color="blue" ref={component3} />
        <ComponentOne color="yellow" ref={component4} />
        <ComponentOne color="purple" ref={component5} />
      </div>
    </div>
  );
};

const NavList = styled.ul`
  display: flex;
  list-style: none;
`;
export default ScrollDomPage;
