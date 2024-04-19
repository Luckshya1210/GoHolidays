 
import { Link } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import SignOutButton from './SignOutButton';

const Header = () => {
  const {isLoggedIn}=useAppContext();
  return (
    <div className="bg-blue-800 py-6 w-full">
       <div className="container mx-auto flex justify-between">
            <span className="text-3xl text-white font-bold tracking-tight">
                <Link to="/">GoHolidays</Link>
                
            </span>
            <span className="flex space-x-2">
              {isLoggedIn ? <>
                <Link to='/my-bookings' className='flex text-white rounded-sm items-center px-3 font-bold  hover:bg-blue-600' >My Bookings</Link>
                <Link to='/my-hotels' className='flex text-white rounded-sm items-center px-3 font-bold  hover:bg-blue-600'>My Hotels</Link>
                <SignOutButton/>
              </>:  
              <>
              <Link className="flex bg-white items-center rounded-sm text-blue-600 px-3 font-bold hover:bg-gray-100" to="/register" >Register</Link>
              <Link className="flex bg-white items-center rounded-sm text-blue-600 px-3 font-bold hover:bg-gray-100" to="/signin" >Sign in</Link>
              </>
            }
              </span>
        </div>
    </div>
  )
}

export default Header