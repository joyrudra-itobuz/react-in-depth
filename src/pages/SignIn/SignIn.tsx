import SubmitButton from '../../components/Global/Buttons/SubmitButton';
import AnimatedInputLabel from '../../components/Global/Inputs/AnimatedInputLabel';
import EclipseLoader from '../../components/Global/EclipseLoader/EclipseLoader';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import apiCall from '../../helper/apiCalls';
import { signInValidationSchema } from '../../validators/userDetails';

type LogInType = {
  email: string;
  password: string;
};

type Profile = {
  userType: string;
  name?: string;
  email: string;
  phoneNumber?: number;
  password: string;
  hasOnboarded: boolean;
  isActive?: boolean;
  profileImage?: string;
  imageName?: string;
  lastLogin?: string;
  deleteStatus?: boolean;
  outlets?: Array<string>;
};

type LoginResponse = {
  userDetails: Profile;
  accessToken: string;
  refreshToken: string;
};

export default function SignIn() {
  const navigate = useNavigate();
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
    <div className='flex justify-center p-5'>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignIn)}
          className='xs:max-w-[30rem] flex w-full flex-col gap-5  rounded-xl border p-5'
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
