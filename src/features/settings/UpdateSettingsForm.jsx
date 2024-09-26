import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

import Spinner from '../../ui/Spinner';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;

    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow labelText='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow labelText='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow labelText='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow labelText='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
