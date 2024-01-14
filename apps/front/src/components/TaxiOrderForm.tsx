// TaxiOrderForm.tsx
import React, { useState } from 'react';
import Logo from './Logo';

interface TaxiOrderFormProps {
    onClose: () => void;
    onConfirm: () => void;
}

const TaxiOrderForm: React.FC<TaxiOrderFormProps> = ({ onClose, onConfirm }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const handleConfirm = () => {
        // Implement logic to find and mark the relevant taxi on the map
        // You can use the selectedCategory, selectedTime, and any other necessary data
        // You may want to communicate with a server to find the nearest taxi and calculate the route/time.

        // Call the onConfirm function to close the form or perform additional actions
        onConfirm();
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-md text-black">
            <div className='flex items-center mb-4'>
                <Logo />
                <h2 className="text-2xl font-bold ml-2">Order a Taxi</h2>
            </div>
            <input className='mb-4 border-2 border-amber-500 rounded-md p-2' type="text" placeholder='Enter a destination' />

            <label className='mb-2 block'>Category</label>
            <select className='mb-4 border-2 border-amber-500 rounded-md p-2' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Select a category</option>
                <option value="Economy">Economy</option>
                <option value="Comfort">Comfort</option>
                <option value="Business">Business</option>
            </select>
            <div>
                <input type="radio" id="html" name="fav_language" value="HTML" className='mr-2 color-amber-500 border-2 border-amber-500 rounded-md p-2' />
                <label htmlFor="html" className='mr-2'>HTML</label>
                <input type="radio" id="css" name="fav_language" value="CSS" />
                <label htmlFor="css">CSS</label>
                <input type="radio" id="javascript" name="fav_language" value="JavaScript" />
                <label htmlFor="javascript">JavaScript</label>
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
