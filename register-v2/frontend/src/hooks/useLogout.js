import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from './useWorkoutsContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    // remove user fro  storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });

    // clear global workouts state, so then logged in we dont see all data before user's data loads
    workoutsDispatch({ type: 'SET_WORKOUTS', payload: null });
  };

  return { logout };
};
