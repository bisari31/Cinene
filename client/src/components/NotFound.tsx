import styled from 'styled-components';

export default function NotFound() {
  return <NotFoundWrapper>페이지 없음</NotFoundWrapper>;
}

const NotFoundWrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: 65px;
  font-weight: 700;
  height: 80vh;
  justify-content: center;
`;
