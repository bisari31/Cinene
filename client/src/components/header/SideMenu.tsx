import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  refElement: React.RefObject<HTMLDivElement>;
  onClick: () => void;
}

export default function SideMenu({ refElement, ...rest }: IProps) {
  return (
    <SideMenuWrapper ref={refElement}>
      <ul>
        <li>
          <Link to="/mypage">내 정보</Link>
        </li>
        <li>
          <button type="button" {...rest}>
            로그아웃
          </button>
        </li>
      </ul>
    </SideMenuWrapper>
  );
}

const SideMenuWrapper = styled.div`
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 10px;
  box-shadow: 2px 2px 12px 3px rgba(197, 197, 197, 0.31);
  overflow: hidden;
  position: absolute;
  right: 0;
  text-align: center;
  top: 70px;
  width: 180px;
  z-index: 100;
  ul {
    display: flex;
    flex-direction: column;
    li + li {
      border-top: 1px solid ${({ theme }) => theme.colors.gray100};
    }
    li {
      font-weight: 400;
      height: 100%;
      justify-content: center;
      width: 100%;
      &:hover {
        background-color: ${({ theme }) => theme.colors.gray50};
      }
      a {
        padding: 1em;
        width: 100%;
      }
      button {
        background: none;
        border: none;
        line-height: 1;
        padding: 1em;
        width: 100%;
      }
    }
  }
`;
