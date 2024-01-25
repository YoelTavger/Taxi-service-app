import React, { useState, useRef, useEffect } from 'react';
import Logo from './Logo';

interface TaxiOrderFormProps {
  onClose: () => void;
  onConfirm: () => void;
}

const TaxiOrderForm: React.FC<TaxiOrderFormProps> = ({ onClose, onConfirm }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  const handleConfirm = () => {
    onConfirm();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Cleanup the event listener on unmount

  return (
    <div
      ref={formRef}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-md text-black"
    >
            <div className='flex items-center mb-4'>
                <Logo />
                <h2 className="text-2xl font-bold ml-2">Order a Taxi</h2>
            </div>
            <input className='mb-4 border-2 border-amber-500 rounded-md p-2' type="text" placeholder='Enter a destination' />

            <label className='mb-2 block'>Number of passengers</label>
            <input type="number" className='w-[30%] mb-4 border-2 border-amber-500 rounded-md p-2'/>
            <div className='flex flex-col'>
                <div>
                    <input type="radio" id="Classic" name="fav_language" value="Classic" className='mr-2 color-amber-500 border-2 border-amber-500 rounded-md p-2' />
                    <label htmlFor="Classic" className='mr-2'>Classic</label>
                </div>
                <div>
                    <input type="radio" id="css" name="fav_language" value="VIP" />
                    <label htmlFor="VIP" className='ml-2'>VIP</label>
                </div>
            </div>
            <div>
                <button
                    className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-400"
                    onClick={handleConfirm}
                >
                    Confirm
                </button>
                <button
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default TaxiOrderForm;
