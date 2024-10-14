import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteBooking as deleteBookingAPI } from '../../services/apiBookings';
// import { useNavigate, useParams } from 'react-router-dom';

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  // const { bookingId } = useParams();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingAPI(id),
    onSuccess: () => {
      toast.success('Booking successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      // if (bookingId) navigate('/bookings');
    },
    onError: (err) =>
      toast.error(
        `Something went wrong while deleting booking: ${err.message}`
      ),
  });

  return { isDeleting, deleteBooking };
}
