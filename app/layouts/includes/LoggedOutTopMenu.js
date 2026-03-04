"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from "next/navigation";
import Link from "next/link"; 

export default function TopMenu(){
    const router = useRouter();
    const supabase = createClientComponentClient();
    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
        setUser(null)
    }

    return(
            <div id="TopMenu" className ="bg-blue-700 p-2 border-b"> 
                <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
                    <ul id="TopMenuLeft" className="flex items-center text-[11px] text-[#333333] px-2 h-8 ">
                        {/* Logout button*/}
                        <li className="mt-1 relative px-3">
                            <Link href="/login" className="text-[15px] text-white flex items-center gap-2 hover:underline cursor-pointer">
                                <div><a onClick={handleLogout}>Log In</a></div>

                            </Link>
                        </li>    
                    </ul>
                </div>
            </div>
        

    );

}