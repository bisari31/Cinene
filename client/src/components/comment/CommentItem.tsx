import styled from 'styled-components';
import { IComment } from 'types/comment';

interface IProps {
  data: IComment;
}

export default function CommentItem({ data }: IProps) {
  return (
    <CommentItemWrapper>
      <div>
        <p />
      </div>
      <div>
        <NicknameWrapper>
          <span className="comment_nickname">
            <b>{data.writer.nickname}</b>
          </span>
          <span>{data.createdAt}</span>
        </NicknameWrapper>
        <ContentWrapper>
          <span>{data.comment}</span>
        </ContentWrapper>
      </div>
    </CommentItemWrapper>
  );
}

const CommentItemWrapper = styled.li`
  display: flex;
  padding: 1em;
  & > div:first-of-type {
    background-color: ${({ theme }) => theme.colors.gray100};
    border-radius: 50%;
    height: 40px;
    margin-right: 1em;
    width: 40px;
  }
  & > div:last-of-type {
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      display: flex;
      font-size: 13px;
    }
  }
`;

const NicknameWrapper = styled.div`
  align-items: center;
  display: flex;
  .comment_nickname {
    b {
      font-size: 15px;
      font-weight: 500;
    }
  }
  span + span {
    margin-left: 1em;
  }
  span:last-of-type {
    color: ${({ theme }) => theme.colors.gray500};
  }
`;

const ContentWrapper = styled.div`
  margin-top: 0.3em;
`;
