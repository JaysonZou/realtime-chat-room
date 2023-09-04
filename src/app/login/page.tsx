'use client'
import { IconButton } from '@material-tailwind/react';
import { signIn} from 'next-auth/react'
import { toast } from 'react-hot-toast';

const page = () => {
  const loginWithGoogle = async () => {
    try {
      await signIn('google');
    } catch (error) {
      toast.error('Something went wrong with your sign in.')
    }
    
  }
  return <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full flex flex-col items-center max-w-md space-y-8">
      <div className="flex flex-col items-center gap-8">
        LOGO
        <h2 className="mt-6 text-align text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <IconButton onClick={loginWithGoogle}>
        <i className="fab fa-google text-lg" />
        Google
      </IconButton>
    </div>
  </div>
}

export default page;