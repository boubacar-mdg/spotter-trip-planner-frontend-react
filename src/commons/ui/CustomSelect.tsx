import { ChevronDown } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

const CustomSelect = ({ options, onChange }: { options: any[],  onChange: Dispatch<SetStateAction<any>>; }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Filtre by');

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleSelect = (option: any) => {
    setSelected(option.name);
    setIsOpen(false);
    onChange(option.key);
  };

  return (
    <div className="relative ">
      <button 
        onClick={toggleDropdown}
        className="flex items-center px-6 py-3 bg-white rounded-full border border-gray-200 text-gray-800 font-medium shadow-sm hover:opacity-70 transition"
      >
        <span>{selected}</span>
        <ChevronDown size={20} className="ml-2" />
      </button>
      
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;