import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const SpinnerContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const Spinner = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 6px solid #58a6ff;
  border-radius: 50%;
  animation: github-spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #58a6ff transparent transparent transparent;

  &:nth-child(1) {
    animation-delay: -0.45s;
  }
  &:nth-child(2) {
    animation-delay: -0.3s;
  }
  &:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes github-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader: React.FC = () => {
  return (
    <LoaderContainer>
      <SpinnerContainer>
        <Spinner />
        <Spinner />
        <Spinner />
        <Spinner />
      </SpinnerContainer>
    </LoaderContainer>
  );
};

export default Loader; 