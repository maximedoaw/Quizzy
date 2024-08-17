import { FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="flex border p-3 items-center justify-between sticky">
      <img 
        src="/vercel.svg" 
        alt="Quizz logo"
        className="h-5 mr-4"
      />
      <div className="flex w-100 items-center bg-gray-200 rounded-full justify-between">
        <input 
            type="text" 
            placeholder="Search quizz"
            className="bg-gray-200 p-3 focus:outline-none rounded-full w-full"
        />
        <FaSearch className='mr-[10px]'/>
      </div>

      <img 
        src="/next.svg" 
        alt="" 
        className='h-5'
      />
    </div>
  )
}

export default Header
