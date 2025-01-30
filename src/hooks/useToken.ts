import { useQuery } from 'react-query';
import authTokenManager from '@/models/AuthTokenManager';

const useToken = () => {
  const { data: token } = useQuery('authToken', () => authTokenManager.fetchExtranetToken(), {
    staleTime: 60 * 60 * 1000,
  });
  return token;
};

export default useToken;
