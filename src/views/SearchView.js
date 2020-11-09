import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import useEventListener from '@use-it/event-listener';
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

const StyledTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 0 auto;
  justify-content: flex-end;
`;
const StyledTag = styled.div`
  width: 120px;
  height: 40px;
  font-family: 'Source Sans Pro', sans-serif;
  border: 2px solid #acb4bb;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  color: #413d51;
  transition: 0.1s;
  margin-right: 20px;
  margin-bottom: 20px;
  &:hover {
    background-color: #413d51;
    border: 2px solid #413d51;
    color: #f7e8ad;
    cursor: pointer;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

const SearchView = ({
  match,
  searchPhotosAction,
  popupAction,
  searchPhotos,
  popup,
  autoComplete: { keywords },
}) => {
  const [tags, setTags] = useState([]);
  const [loaded, setLoaded] = useState(0);
  const [fetchedPagesCount, setfetchedPagesCount] = useState(2);
  useEffect(() => {
    searchPhotosAction(match.params.searchString, 1);
    setTags(keywords);
  }, [match.params.searchString]);

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

  useEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      searchPhotosAction(match.params.searchString, fetchedPagesCount);
      setfetchedPagesCount(fetchedPagesCount + 1);
    }
  });
  return (
    <>
      {popup.show && <PicturePopup image={popup.item} />}
      <StyledNavWrapper>
        <Owl />
        <Input altInput placeholder='search for photos...' />
      </StyledNavWrapper>
      {tags.length > 0 && (
        <StyledTags>
          {tags.map((item) => (
            <StyledLink to={`../search/${item}`}>
              <StyledTag>{item}</StyledTag>
            </StyledLink>
          ))}
        </StyledTags>
      )}

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
  autoComplete: PropTypes.shape({
    keywords: PropTypes.array,
  }),
  searchPhotosAction: PropTypes.func.isRequired,
  popupAction: PropTypes.func.isRequired,
  searchPhotos: PropTypes.object,
  popup: PropTypes.object,
};

const mapStateToProps = (state) => ({
  searchPhotos: state.searchPhotos,
  popup: state.popup,
  autoComplete: state.autoComplete,
});

export default connect(mapStateToProps, {
  searchPhotosAction,
  popupAction,
})(SearchView);
