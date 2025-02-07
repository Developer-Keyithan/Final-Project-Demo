import { LuLoaderCircle } from 'react-icons/lu';
import './style.css'

const Loader = () => {
  return (
    <div className='w-full h-[100vh] flex justify-center items-center gap-12'>
      <LuLoaderCircle className='text-5xl animate-spin' />
      <p className='text-4xl'>Loading...</p>
    </div>
  );
};

export default Loader;
