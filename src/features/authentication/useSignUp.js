import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignUp() {
  const { mutate: signup, isLoading: isCreatingUser } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),

    onSuccess: (user) => {
      toast.success(`Account for ${user} successfully created!`);
    },

    onError: () => {
      toast.error('There was a problem creating the account');
    },
  });

  return { signup, isCreatingUser };
}
