import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { clearPopupAction } from '../../redux/actions/popup';

const StyledWrapper = styled.div`
  position: fixed;
  top: 70px;
  left: 50%;
  width: 95%;
  max-width: 800px;
  height: 90vh;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.98);
  z-index: 99999;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  div {
    display: flex;
    align-items: center;
    padding: 0 20px 10px;
  }
  p {
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 700;
    color: #413d51;
    font-size: 18px;
  }
  @media (max-width: 600px) {
    top: 10px;
  }
`;

const StyledImage = styled.div`
  width: 100%;
  height: 95%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 0;
  background-image: url(${({ image }) => image});
`;
const StyledProfileImage = styled.div`
  width: 40px;
  height: 40px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${({ profile }) => profile});
  border-radius: 50%;
  margin-right: 10px;
`;

const StyledLocationParagraph = styled.p`
  margin-left: auto;
`;

const StyledIcon = styled.i`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  color: white;
  cursor: pointer;
  background-color: #413d51;
  padding: 3px 7px;
  border-radius: 6px;
  transition: 0.1s;
  border: 3px solid #413d51;
  &:hover {
    color: #413d51;
    background-color: #fefefe;
  }
`;
const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.7;
  z-index: 7777;
`;
const PicturePopup = ({ image, clearPopupAction }) => (
  <>
    <StyledBackground />
    <StyledWrapper>
      <StyledIcon className='fas fa-times' onClick={() => clearPopupAction()} />
      <StyledImage image={image && image.urls.regular} />
      <div>
        <StyledProfileImage
          profile={image && image.user.profile_image.medium}
        />
        <p>{image && image.user.name}</p>
        <StyledLocationParagraph>
          <i className='fas fa-map-marker-alt' />
          {image && image.user.location
            ? ` ${image.user.location}`
            : ' Somewhere...'}
        </StyledLocationParagraph>
      </div>
    </StyledWrapper>
  </>
);

PicturePopup.propTypes = {
  image: PropTypes.object.isRequired,
  clearPopupAction: PropTypes.func.isRequired,
};
export default connect(null, { clearPopupAction })(PicturePopup);
