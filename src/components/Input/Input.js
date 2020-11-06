import React, { useState, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import useEventListener from '@use-it/event-listener';
import { autoCompleteAction } from '../../redux/actions/autoComplete';
import SearchIcon from '../../assets/search.svg';

const StyledWrapper = styled.div`
  margin: 0 auto;
  width: 75%;
  max-width: 660px;
  position: relative;
  ${({ altInput }) =>
    altInput &&
    css`
      margin: 0 0 0 20px;
      max-width: 360px;
    `}
`;
const StyledInput = styled.input`
  display: block;
  width: 100%;
  background: #ffffff;
  border: 1px solid #acb4bb;
  border-radius: 6px;
  font-family: 'Source Sans Pro', sans-serif;
  outline: none;
  height: 45px;
  font-size: 22px;
  font-weight: 400;
  color: #413d51;
  &::placeholder {
    opacity: 0.3;
    font-weight: 400;
    @media (max-width: 300px) {
      font-size: 16px;
    }
  }
  padding: 10px 20px 10px 10px;
  background-image: url(${SearchIcon});
  background-size: 30px;
  background-position: 98% 50%;
  background-repeat: no-repeat;
  ${({ altInput }) =>
    altInput &&
    css`
      height: 35px;
    `}
`;

const StyledCompleteBlock = styled.div`
  position: absolute;
  left: 0;
  top: 40px;
  font-weight: 400;
  background-color: #ffffff;
  width: 100%;
  border: 1px solid #acb4bb;
  border-top: none;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
  padding: 10px 0;
  span {
    display: block;
    text-align: center;
    font-family: 'Source Sans Pro', sans-serif;
    color: #acb4bb;
    font-size: 22px;
    margin: 20px 0 0 0;
    transform: translateY(-50%);
  }
  a {
    text-decoration: none;
    &.active {
      background-color: #f7e8ad;
    }
  }
  p {
    font-family: 'Source Sans Pro', sans-serif;
    color: #413d51;
    margin: 0;
    padding: 15px 0 15px 30px;
    border-top: 1px solid rgba(0, 0, 0, 0.03);
    transition: 0.2s;
    &:hover {
      background-color: #f7e8ad;
      cursor: pointer;
    }
  }
  ${({ altInput }) =>
    altInput &&
    css`
      border-top: 1px solid #acb4bb;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      padding: 0;
      overflow: hidden;
    `}
`;

const Input = ({
  placeholder,
  altInput,
  autoCompleteAction,
  autoComplete: { keywords, loaded },
  history,
}) => {
  const [inputText, setInputText] = useState('');
  const [inputFocus, setInputFocus] = useState(false);
  const autoCompleteContainer = useRef(null);
  const inputContainer = useRef(null);

  const handleChange = (value) => {
    setInputText(value);
    if (value.length >= 3) {
      autoCompleteAction(value);
    }
  };

  const keyHandler = ({ key }) => {
    const parent = autoCompleteContainer.current;
    if (parent && !parent.querySelector('.active') && key === 'Enter') {
      history.push(`../search/${inputText}`);
      setInputText('');
    }
    if (parent && !parent.querySelector('.active') && key === 'ArrowDown') {
      parent.querySelectorAll('a')[0].classList.add('active');
      return null;
    }
    if (parent && key === 'ArrowDown') {
      if (!parent.querySelector('.active').nextSibling) {
        const paragraphs = parent.querySelectorAll('a');
        paragraphs[0].classList.add('active');
        paragraphs[paragraphs.length - 1].classList.remove('active');
      } else {
        parent.querySelector('.active').nextSibling.classList.add('active');
        parent.querySelector('.active').classList.remove('active');
      }
    }
    if (parent && key === 'ArrowUp') {
      if (!parent.querySelector('.active').previousSibling) {
        const paragraphs = parent.querySelectorAll('a');
        paragraphs[0].classList.remove('active');
        paragraphs[paragraphs.length - 1].classList.add('active');
      } else {
        parent.querySelector('.active').previousSibling.classList.add('active');
        parent.querySelectorAll('.active')[1].classList.remove('active');
      }
    }
    if (parent && parent.querySelector('.active') && key === 'Enter') {
      parent.querySelector('.active').click();
      setInputText('');
    }
  };
  const clickHandler = (e) => {
    if (
      autoCompleteContainer.current &&
      !autoCompleteContainer.current.contains(e.target) &&
      !inputContainer.current.contains(e.target)
    ) {
      setInputFocus(false);
    }
  };

  useEventListener('keydown', keyHandler);
  useEventListener('mousedown', clickHandler);
  return (
    <StyledWrapper altInput={altInput}>
      <StyledInput
        altInput={altInput}
        placeholder={placeholder}
        value={inputText}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setInputFocus(true)}
        ref={inputContainer}
      />
      {inputFocus && inputText.length >= 3 && keywords && loaded && (
        <StyledCompleteBlock altInput={altInput} ref={autoCompleteContainer}>
          {keywords.length > 0 ? (
            keywords.map((item) => (
              <Link key={item} to={`../search/${item}`}>
                <p>{item}</p>
              </Link>
            ))
          ) : (
            <span>No results...😢</span>
          )}
        </StyledCompleteBlock>
      )}
    </StyledWrapper>
  );
};

Input.propTypes = {
  autoCompleteAction: PropTypes.func.isRequired,
  autoComplete: PropTypes.object.isRequired,
  keywords: PropTypes.array,
  loaded: PropTypes.bool,
  altInput: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  history: PropTypes.object,
};

const mapStateToProps = (state) => ({
  autoComplete: state.autoComplete,
});

export default connect(mapStateToProps, {
  autoCompleteAction,
})(withRouter(Input));
