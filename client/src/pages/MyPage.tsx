import styled from 'styled-components';

import Tab from 'components/user/profile/Tab';
import Profile from 'components/user/profile';
import withLoginPortal, {
  LoginPortalProps,
} from 'components/hoc/withLoginPortal';
import { useRedirection } from 'hooks';

function MyPage({ openModal }: LoginPortalProps) {
  useRedirection(true);

  return (
    <MypageWrapper>
      <Profile openModal={openModal}>
        <Tab openModal={openModal} />
      </Profile>
    </MypageWrapper>
  );
}

export default withLoginPortal(MyPage);

const MypageWrapper = styled.div``;
