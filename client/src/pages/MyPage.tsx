import styled from 'styled-components';

import Tab from 'components/user/profile/Tab';
import Profile from 'components/user/profile';
import withLoginPortal, {
  LoginPortalProps,
} from 'components/hoc/withLoginPortal';

function MyPage({ openModal }: LoginPortalProps) {
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
