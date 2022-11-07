import dayjs from 'dayjs';
import styled from 'styled-components';

interface IProps {
  content?: IPost;
}

export default function PostHeader({ content }: IProps) {
  return (
    <PostHeaderWrapper>
      <ImgWrapper>
        <p />
      </ImgWrapper>
      <Details>
        <div className="title_wrapper">
          <span>
            <b>{content?.writer.nickname}</b>
          </span>
        </div>
        <div className="desc_wrapper">
          <span>{dayjs(content?.createdAt).format('YYYY.MM.DD HH:MM')}</span>
          <span>조회수: {content?.views}</span>
          <span>댓글: 0</span>
        </div>
      </Details>
    </PostHeaderWrapper>
  );
}

const PostHeaderWrapper = styled.div`
  display: flex;
  height: 50px;
  margin-bottom: 1em;
  padding: 0 1em;
`;

const ImgWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-right: 1em;
  p {
    background-color: ${({ theme }) => theme.colors.gray100};
    border-radius: 50%;
    height: 40px;
    width: 40px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title_wrapper {
    b {
      font-weight: 500;
    }
    font-size: 16px;
  }
  .desc_wrapper {
    font-size: 12px;
    margin-top: 0.3em;
    span + span {
      margin-left: 0.3em;
    }
  }
`;
