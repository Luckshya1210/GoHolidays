import { HotelType } from '../../../backend/src/models/hotel'
import { Link } from 'react-router-dom'
type Props={
    hotel:HotelType
}
const LatestDestinationCard = ({hotel}:Props) => {
  return (
    <Link to={`/detail/${hotel._id}`} className='relative cursor:pointer rounded-md overflow-hidden' >
        <div className='h-[300px]'>
            <img src={hotel.imageUrls[0]} className='object-center object-cover w-full h-full'/>
        </div>
        <div className='absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md'>
            <span className='text-white font-bold tracking-tight text-3xl'>{hotel.name}</span>
        </div>
    </Link>
  )
}

export default LatestDestinationCard