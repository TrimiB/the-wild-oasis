import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { isCreating, createCabin } = useCreateCabin();

  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    // console.log(data);
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => reset(getValues()),
        }
      );
    else createCabin({ ...data, image: image }, { onSuccess: () => reset(getValues()) });
  };

  const onError = (err) => {
    // console.log(err);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow labelText='Cabin name' errorMessage={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow labelText='Maximum capacity' errorMessage={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register('maxCapacity', {
            required: { value: true, message: 'This field is required' },
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow labelText='Regular price' errorMessage={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow labelText='Discount' errorMessage={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow labelText='Description for website' errorMessage={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          disabled={isWorking}
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow labelText='Cabin photo' errorMessage={errors?.image?.message}>
        <FileInput
          id='image'
          accept='image/*'
          disabled={isWorking}
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation='secondary' type='reset' disabled={isWorking}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
