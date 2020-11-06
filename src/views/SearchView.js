import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import { searchPhotosAction } from '../redux/actions/searchPhotos';
import { popupAction } from '../redux/actions/popup';
import PicturePopup from '../components/PicturePopup/PicturePopup';
import Owl from '../components/Logo/OwlLogo';
import Input from '../components/Input/Input';

const StyledNavWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 10px 40px 10px;
`;

const StyledPhotosWrapper = styled.div`
  width: 100%;
  &.loaded {
    width: calc(100% -1px);
  }
`;

const StyledImage = styled.div`
  margin: 10px;
  img {
    transition: 0.3s;
  }
  img:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const StyledMasonry = styled(Masonry)`
  margin: 0 auto;
`;

const SearchView = ({
  match,
  searchPhotosAction,
  popupAction,
  searchPhotos,
  popup,
}) => {
  useEffect(() => {
    searchPhotosAction(match.params.searchString, 1);
  }, [match.params.searchString]);

  const [loaded, setLoaded] = useState(0);

  const items = searchPhotos.photos.map((photo, i) => (
    <StyledImage key={i} onClick={() => popupAction(photo)}>
      <img
        src={photo.urls.small}
        style={{ width: '100%' }}
        alt={photo.alt_description}
        onLoad={() => {
          setLoaded(loaded + 1);
        }}
      />
    </StyledImage>
  ));

  const masonryOptions = {
    fitWidth: true,
  };

  return (
    <>
      {popup.show && <PicturePopup image={popup.item} />}
      <StyledNavWrapper>
        <Owl />
        <Input altInput placeholder='search for photos...' />
      </StyledNavWrapper>
      <StyledPhotosWrapper className={loaded === 9 ? 'loaded' : null}>
        <StyledMasonry options={masonryOptions}>{items}</StyledMasonry>
      </StyledPhotosWrapper>
    </>
  );
};

SearchView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      searchString: PropTypes.string.isRequired,
    }),
  }),
  searchPhotosAction: PropTypes.func.isRequired,
  popupAction: PropTypes.func.isRequired,
  searchPhotos: PropTypes.object,
  popup: PropTypes.object,
};

const mapStateToProps = (state) => ({
  searchPhotos: state.searchPhotos,
  popup: state.popup,
});

export default connect(mapStateToProps, {
  searchPhotosAction,
  popupAction,
})(SearchView);
