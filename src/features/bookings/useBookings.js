import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';

export function useBookings() {
  /**
   * Fetches the list of cabins from the API and stores the result in the `cabins` state variable.
   * The `isLoading` state variable indicates whether the data is currently being fetched.
   * The `error` state variable will contain any errors that occurred during the fetch.
   */
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({ queryKey: ['bookings'], queryFn: getBookings });

  return { bookings, isLoading, error };
}
