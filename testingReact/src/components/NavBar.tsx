
export default function NavBar(){

    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 
        text-center text-lg 
        *:border-2 *:border-blue-950 *:rounded-md *:bg-blue-900 *:text-blue-50">
           <div className="hover:bg-blue-400 hover:text-blue-950">
                Profile
            </div>
           <div className=" hover:bg-blue-400 hover:text-blue-950">
                Your favourite Posts
            </div>
            <div className=" hover:bg-blue-400 hover:text-blue-950">
                Logout
            </div>
        </div>
    )
}