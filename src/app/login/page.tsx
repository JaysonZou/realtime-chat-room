'use client';
import { Icons } from '@/components/Icons';
import { addFriendValidator } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@material-tailwind/react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

type FormData = z.infer<typeof addFriendValidator>;
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
    <div className="mx-auto flex w-full mt-32 flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
      </div>
      <div className="flex flex-col items-center gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <label
            htmlFor="email"
            className="block text-sm text-gray-500 text-center"
          >
            Enter your email below to create your account
          </label>

          <div className="mt-6 flex flex-col gap-4">
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
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-gray-500 bg-white">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        type={'button'}
        variant="outlined"
        onClick={loginWithGoogle}
        className="flex justify-center align-middle gap-3 items-center h-10"
      >
        <Icons.Google />
        Google
      </Button>
      <p className="px-8 text-center text-sm text-gray-500">
        By clicking continue, you agree to our{' '}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default Page;
