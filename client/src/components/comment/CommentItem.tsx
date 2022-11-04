import styled from 'styled-components';
import { IComment } from 'types/comment';
import { changeCreatedAt } from 'utils';

interface IProps {
  comment: IComment;
  handleShowReplyComment?: () => void;
  isReply?: boolean;
}
export default function CommentItem({
  comment,
  isReply = false,
  handleShowReplyComment,
}: IProps) {
  return (
    <CommentItemWrapper isReply={isReply} onClick={handleShowReplyComment}>
      <Avatar>
        <p />
      </Avatar>
      <Content>
        <NicknameWrapper>
          <span>
            <b>{comment.writer.nickname}</b>
          </span>
          <span>{changeCreatedAt(comment.createdAt)}</span>
        </NicknameWrapper>
        <ContentWrapper>
          <span>{comment.comment}</span>
        </ContentWrapper>
      </Content>
    </CommentItemWrapper>
  );
}

const CommentItemWrapper = styled.div<{ isReply: boolean }>`
  display: flex;
  flex: 1;
  margin-left: auto;
  padding: 1em;
  width: ${({ isReply }) => (isReply ? '95%' : '100%')};
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray50};
    border-radius: 10px;
    cursor: pointer;
  }
`;

const Avatar = styled.div`
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 50%;
  height: 40px;
  margin-right: 1em;
  width: 40px;
`;
const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  span {
    display: flex;
    font-size: 13px;
  }
`;

const NicknameWrapper = styled.div`
  align-items: center;
  display: flex;
  span + span {
    margin-left: 1em;
  }
  span:first-of-type {
    b {
      font-size: 15px;
      font-weight: 500;
    }
  }
  span:last-of-type {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const ContentWrapper = styled.div`
  margin-top: 0.3em;
`;
