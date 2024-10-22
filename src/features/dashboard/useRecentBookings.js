import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBookingsAfterDate } from '../../services/apiBookings';
import { useMemo } from 'react';

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = useMemo(() => {
    return !searchParams.get('last') ? 7 : Number(searchParams.get('last'));
  }, [searchParams]);

  const queryDate = useMemo(() => {
    return subDays(new Date(), numDays).toISOString();
  }, [numDays]);

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', `last-${numDays}`, queryDate],
  });

  return { isLoading, bookings };
}
