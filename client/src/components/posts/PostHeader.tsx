import dayjs from 'dayjs';
import styled from 'styled-components';

interface IProps {
  content?: IPost;
}

export default function PostHeader({ content }: IProps) {
  return (
    <PostHeaderWrapper>
      <ImgWrapper>
        <img src={`/${content?.writer?.img}`} alt="user_image" />
      </ImgWrapper>
      <Details>
        <div className="title_wrapper">
          <span>
            <b>{content?.writer?.nickname}</b>
          </span>
        </div>
        <div className="desc_wrapper">
          <span>{dayjs(content?.createdAt).format('YYYY.MM.DD HH:MM')}</span>
          <span>조회수: {content?.views}</span>
          <span>댓글: {content?.commentsNum}</span>
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
  img {
    border-radius: 50%;
    height: 40px;
    object-fit: cover;
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
