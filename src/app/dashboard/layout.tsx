import {ReactNode} from "react";
import Link from "next/link";
import {Icons, Icon} from "@/components/Icons";
import {notFound} from "next/navigation";
import {authOptions} from "@/lib/auth";
import {getServerSession} from "next-auth";
import {fetchRedis} from "@/helpers/redis";
import FriendRequestSidebarOptions from "@/components/FriendRequestSidebarOptions";

interface LayoutProps {
    children: ReactNode
}

export interface SidebarOption {
    id: number
    name: string
    href: string
    Icon: Icon
}

const sidebarOptions: SidebarOption[] = [
    {
        id: 1,
        name: 'Add friend',
        href: '/dashboard/add',
        Icon: 'UserPlus',
    },
]

const Layout = async ({children}: LayoutProps) => {
    const session = await getServerSession(authOptions)
    if (!session) notFound()

    const unseenRequestCount = (
        (await fetchRedis(
            'smembers',
            `user:${session.user.id}:incoming_friend_requests`
        )) as User[]
    ).length

    return <div className={`w-full flex h-screen`}>
        <div className='flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r
          border-gray-200 bg-white px-6'>
            <Link href='/dashboard' className='flex h-16 shrink-0 items-center'>
                <Icons.Logo className='h-8 w-auto text-indigo-600'></Icons.Logo>
            </Link>
            <div className='text-xs font-semibold leading-6'>
                Your chats
            </div>
            <nav className={`flex flex-col flex-1`}>
                <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                    <li>
                        {/*<SidebarChatList sessionId={session.user.id} friends={friends} />*/}
                        chats user list
                    </li>
                    <li>
                        <div className='text-xs font-semibold leading-6 text-gray-400'>
                            Overview
                        </div>

                        <ul role='list' className='-mx-2 mt-2 space-y-1'>
                            {sidebarOptions.map((option) => {
                                const Icon = Icons[option.Icon]
                                return (
                                    <li key={option.id}>
                                        <Link
                                            href={option.href}
                                            className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold'>
                            <span className='text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'>
                              <Icon className='h-4 w-4' />
                            </span>

                                            <span className='truncate'>{option.name}</span>
                                        </Link>
                                    </li>
                                )
                            })}

                            <li>
                                <FriendRequestSidebarOptions
                                    sessionId={session.user.id}
                                    initialUnseenRequestCount={unseenRequestCount}
                                />
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
        <aside className='max-h-screen container py-16 md:py-12 w-full'>
            {children}
        </aside>
    </div>
}

export default Layout;
