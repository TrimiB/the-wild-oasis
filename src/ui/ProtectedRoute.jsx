import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useUser } from '../features/authentication/useUser';

import Spinner from './Spinner';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  // 1. Load the authenticated user
  const { isLoadingUser, isAuthenticated, isFetching } = useUser();
  const navigate = useNavigate();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isLoadingUser && !isFetching) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, isLoadingUser, isFetching]);

  // 3. while loading user, show a spinner
  if (isLoadingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there IS a user, allow to render child
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
