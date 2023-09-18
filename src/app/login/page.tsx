'use client';
import { addFriendValidator } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@material-tailwind/react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const Page = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const loginWithGoogle = async () => {
    try {
      await signIn('google');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong with your sign in.');
    }
  };

  const onSubmit = (value: unknown) => {};

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex flex-col items-center max-w-md space-y-8">
        <div className="flex flex-col items-center gap-8">
          <h2 className="mt-6 text-align text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Enter your email below to create your account
            </label>

            <div className="mt-2 flex flex-col gap-4">
              <input
                {...register('email')}
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="you@example.com"
              />
              <Button type={'submit'}>Sign In with Email</Button>
            </div>
          </form>
        </div>

        <Button onClick={loginWithGoogle}>Google</Button>
      </div>
    </div>
  );
};

export default Page;
