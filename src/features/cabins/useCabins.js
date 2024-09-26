import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
  /**
   * Fetches the list of cabins from the API and stores the result in the `cabins` state variable.
   * The `isLoading` state variable indicates whether the data is currently being fetched.
   * The `error` state variable will contain any errors that occurred during the fetch.
   */
  const { data: cabins, isLoading, error } = useQuery({ queryKey: ['cabins'], queryFn: getCabins });

  return { cabins, isLoading, error };
}
