import styled from 'styled-components';

export default function Loading() {
  return (
    <StyledWrapper>
      <div />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  left: 50%;
  position: absolute;
  top: 40%;
  transform: translate(-50%, -50%);
  div {
    animation: rotation 1s linear infinite;
    border-radius: 50%;
    border-right: 5px solid transparent;
    border-top: 5px solid #dd3b5f;
    box-sizing: border-box;
    display: inline-block;
    height: 78px;
    width: 78px;
    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
