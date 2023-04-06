import styled from 'styled-components';

export default function Loading() {
  return <StyledWrapper />;
}

const StyledWrapper = styled.div`
  animation: rotation 1s linear infinite;
  border-radius: 50%;
  border-right: 5px solid transparent;
  border-top: 5px solid #dd3b5f;
  box-sizing: border-box;
  display: inline-block;
  height: 78px;
  left: 50%;
  position: absolute;
  top: 40%;
  width: 78px;
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
