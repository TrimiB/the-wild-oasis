import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log(errors.passwordConfirm.message);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        labelText='Full name'
        errorMessage={errors?.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          {...register('fullName', {
            required: 'This field is required',
          })}
          autoComplete='full name'
        />
      </FormRow>

      <FormRow
        labelText='Email address'
        errorMessage={errors?.email?.message}>
        <Input
          type='email'
          id='email'
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
          autoComplete='email'
        />
      </FormRow>

      <FormRow
        labelText='Password (min 8 characters)'
        errorMessage={errors?.password?.message}>
        <Input
          type='password'
          id='password'
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
          autoComplete='password'
        />
      </FormRow>

      <FormRow
        labelText='Repeat password'
        errorMessage={errors?.passwordConfirm?.message}>
        <Input
          type='password'
          id='passwordConfirm'
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) => {
              if (value !== getValues().password) {
                return 'Passwords need to match';
              }
            },
          })}
          autoComplete='repeat-password'
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'>
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
