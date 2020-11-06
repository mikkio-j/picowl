import styled from 'styled-components';
import Logo from '../../assets/Logo.svg';
import LogoAlt from '../../assets/Logo_alt.svg';

const StyledLogo = styled.div`
  margin: 20px auto;
  width: 95%;
  max-width: 500px;
  height: 160px;
  background-image: url(${Logo});
  background-size: contain;
  background-repeat: no-repeat;
  transition: 0.3s;
  &:hover {
    background-image: url(${LogoAlt});
  }
`;

export default StyledLogo;
