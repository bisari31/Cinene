import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';

import { cineneKeys } from 'utils/queryOptions';
import { getFavorites } from 'services/like';
import { useAuth } from 'hooks/cinene';

import FavoriteItem from './FavoriteItem';
import Toggle from './Toggle';

export default function Favorites() {
  const { auth, setAuth } = useAuth();
  const [selectedType, setSelectedType] = useState(0);

  const { data } = useQuery(cineneKeys.favorites(), getFavorites, {
    enabled: !!auth,
    onError: ({ response }: AxiosError) => {
      if (response.status === 401) setAuth(null);
    },
  });

  const selectData = () =>
    data?.contents?.filter(({ content: { content_type: type } }) =>
      selectedType === 0 ? type !== 'person' : type === 'person',
    );

  return (
    <StyledWrapper>
      <Toggle selectedType={selectedType} setSelectedType={setSelectedType} />
      <ul>
        {selectData()?.map((item) => (
          <FavoriteItem key={item._id} data={item.content} />
        ))}
      </ul>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  ul {
    align-items: center;
    display: grid;
    gap: 2em;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 4em;
    margin-top: 2em;
  }
  @media ${({ theme }) => theme.device.laptop} {
    ul {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;
