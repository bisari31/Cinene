import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useMutation, useQuery } from 'react-query';

import { Heart } from 'assets';
import { IContent } from 'services/contents';
import { getContentLikes, upLike } from 'services/like';
import { buttonEffect } from 'styles/css';
import { useAuthQuery } from 'hooks/useAuthQuery';

import { queryClient } from 'index';
import useOutsideClick from 'hooks/useOutsideClick';
import Portal from 'components/common/Portal';
import Modal from 'components/common/Modal';
import { useNavigate } from 'react-router-dom';

interface IProps {
  cinene: IContent | null | undefined;
}

export default function Like({ cinene }: IProps) {
  const navigate = useNavigate();

  const { ref, animationState, handleChangeVisibility, isVisible } =
    useOutsideClick(300);

  const { data: auth } = useAuthQuery();

  const { data } = useQuery(
    ['likes', 'content', cinene?._id, { loggedIn: auth?.success }],
    () => getContentLikes(cinene?._id, auth?.user?._id),
    {
      enabled: !!cinene?._id,
    },
  );

  const { mutate } = useMutation(upLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['likes', 'content', cinene?._id]);
    },
  });

  const handleClick = () => {
    if (!auth?.success) return handleChangeVisibility();
    mutate(cinene?._id);
  };

  return (
    <ButtonWrapper color="navy50">
      <Button type="button">리뷰 {cinene?.count}</Button>
      <Button
        type="button"
        isActive={data?.isLike}
        isNotZero={!!data?.likes}
        onClick={handleClick}
      >
        <Heart /> {data?.likes ?? 0}
      </Button>
      {isVisible && (
        <Portal>
          <Modal
            executeFn={() => navigate('/login')}
            closeFn={handleChangeVisibility}
            refElement={ref}
            buttonText={['닫기', '로그인']}
            isVisible={animationState}
            color="pink"
          >
            로그인이 필요합니다 😎
          </Modal>
        </Portal>
      )}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0 1em;
  margin-top: 1rem;
  button {
    ${buttonEffect};
  }
`;

const Button = styled.button<{ isActive?: boolean; isNotZero?: boolean }>`
  ${({ theme, isActive, isNotZero }) => css`
    align-items: center;
    background-color: ${theme.colors.navy50};
    border: ${isActive ? `1px solid ${theme.colors.pink}` : '#fff'};
    border-radius: 7px;
    color: #fff;
    display: flex;
    font-size: 0.78rem;
    font-weight: 400;
    height: 27.45px;
    padding: 0 0.8em;
    svg {
      fill: ${isActive || isNotZero ? theme.colors.pink : ''};
      height: 13px;
      margin-right: 0.3em;
      stroke: ${isActive || isNotZero ? theme.colors.pink : '#fff'};
      stroke-width: 1.5;
      width: 13px;
    }
  `}
`;
