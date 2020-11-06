import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Owl from '../../assets/Owl.svg';

const StyledOwlLogo = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${Owl});
  background-size: contain;
  background-repeat: no-repeat;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;
const OwlLogo = () => (
  <Link to='../'>
    <StyledOwlLogo />
  </Link>
);
export default OwlLogo;
