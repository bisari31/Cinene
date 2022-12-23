import styled from 'styled-components';

import { Menu } from 'assets';

export default function SideMenu() {
  return (
    <SideMenuWrapper>
      <button type="button">
        <Menu />
      </button>
    </SideMenuWrapper>
  );
}

const SideMenuWrapper = styled.div`
  align-items: center;
  display: flex;
  button {
    background: none;
    border: none;
    padding: 0;
    svg {
      display: block;
      fill: #fff;
      margin-right: 1em;
      stroke: #fff;
      stroke-width: 1;
      width: 25px;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    button {
      display: none;
    }
  }
`;
