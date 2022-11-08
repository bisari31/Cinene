import styled from 'styled-components';

import { IComment } from 'types/comment';
import { changeCreatedAt } from 'utils';

interface IProps {
  comment: IComment;
  handleShowReplyComment?: () => void;
  isReply?: boolean;
  replyCommentsNum?: number;
}
export default function CommentItem({
  comment,
  isReply = false,
  replyCommentsNum,
  handleShowReplyComment,
}: IProps) {
  return (
    <CommentItemWrapper isReply={isReply} onClick={handleShowReplyComment}>
      <Avatar>
        <img src={`/${comment.writer.img}`} alt="" />
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
        <DisplayReplyComments hasReplyComments={!!replyCommentsNum}>
          <span>
            {replyCommentsNum
              ? `${replyCommentsNum}개의 답글이 있습니다 `
              : null}
          </span>
        </DisplayReplyComments>
      </Content>
    </CommentItemWrapper>
  );
}

const CommentItemWrapper = styled.div<{ isReply: boolean }>`
  border-radius: 10px;
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
  img {
    border-radius: 50%;
    height: 40px;
    margin-right: 1em;
    object-fit: cover;
    width: 40px;
  }
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

const DisplayReplyComments = styled.div<{ hasReplyComments: boolean }>`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: 12px;
  margin-top: ${({ hasReplyComments }) => hasReplyComments && '1em'};
`;
