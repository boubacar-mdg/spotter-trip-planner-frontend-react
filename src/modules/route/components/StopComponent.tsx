import { FC } from 'react';
import { Stop } from '../../../interfaces/stop';

const TownHallBuildingCard: FC<{stop: Stop}> = ({stop}) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
      <div className="relative mr-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
          <div className="absolute inset-0">
            <div className="w-full h-full bg-gray-300 rounded-full">
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gray-900"></div>
              <div className="absolute top-0 left-0 w-0 h-0 border-solid border-l-transparent border-r-transparent border-b-gray-900 border-l-8 border-r-8 border-b-16"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      
      <div className="flex-grow">
        <h2 className="text-xl font-bold text-gray-800">{stop.location}</h2>
        <p className="text-gray-500">Active</p>
      </div>
      
      <div className="flex items-center">
        <span className="text-gray-500 mr-4">03/10/2019</span>
        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
          
        </div>
      </div>
    </div>
  );
};

export default TownHallBuildingCard;