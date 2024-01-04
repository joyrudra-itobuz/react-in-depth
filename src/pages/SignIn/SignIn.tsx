import SubmitButton from '../../components/Global/Buttons/SubmitButton';
import AnimatedInputLabel from '../../components/Global/Inputs/AnimatedInputLabel';
// import EclipseLoader from '../../components/Global/EclipseLoader/EclipseLoader';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import apiCall from '../../helper/apiCalls';
import { signInValidationSchema } from '../../validators/userDetails';
import { LogInType, LoginResponse } from '../../types/global';
import { UserContext } from '../../context/Globals/UserContext';

export default function SignIn() {
  const navigate = useNavigate();
  const { setProfile } = useContext(UserContext);
  const form = useForm<LogInType>({
    resolver: yupResolver(signInValidationSchema),
  });

  const handleSignIn = async (formValue: LogInType) => {
    try {
      const response = await apiCall<LoginResponse, LogInType>(
        '/login',
        'POST',
        formValue
      );

      if (response.data) {
        setProfile(response.data.userDetails);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <div className='flex justify-center  p-5'>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignIn)}
          className='flex w-full flex-col gap-5 rounded-xl  border bg-[rgb(29,29,29)] p-5 xs:max-w-[30rem]'
        >
          <h2 className='bg-radial-red p-5 text-center text-2xl'>
            Welcome back!
          </h2>
          <AnimatedInputLabel
            name='email'
            label='Email'
            className='w-full'
            type='text'
          />
          <AnimatedInputLabel
            name='password'
            label='Password'
            type='password'
            className='w-full'
          />
          <SubmitButton className='relative'>
            {/*<div className='absolute '>
              <EclipseLoader className='translate-x-[8rem] translate-y-[-5.6rem] scale-[15%]' />
            </div> */}
            Submit
          </SubmitButton>
        </form>
      </FormProvider>
    </div>
  );
}
