import {Button} from "@material-tailwind/react";
import {addFriendValidator} from "@/lib/validation";
import axios from "axios";
import {useState} from "react";

export const AddFriendButton = () => {
    const [showSuccess, setShowSuccess] = useState(false)
    const addFriend = async (email: string) => {
        try {
            const validatedEmail = addFriendValidator().parse({ email })
            await axios.post('/api/friends/add', { email: validatedEmail })
            setShowSuccess(true)
        } catch (e) {

        }
    }
    return <form className='max-w-sm'>
        <label htmlFor="email" className='block text-sm font-medium leading-6 text-gray-900'>
            Add Friend By Email
        </label>
        <input placeholder='you@example.com' type="text" className='block w-full text-gray-900 border-0 rounded-md py-1.5'/>
        <Button>Add</Button>
    </form>
}
