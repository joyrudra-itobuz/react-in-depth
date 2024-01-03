import * as yup from 'yup';

export const emailValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required('Please Provide registered email id.')
    .email('Email is invalid!'),
});

export const signInValidationSchema = yup
  .object({
    password: yup.string().required('Please enter your password.'),
  })
  .concat(emailValidationSchema);
