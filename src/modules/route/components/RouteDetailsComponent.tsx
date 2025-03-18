import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { tripApi } from '../../../api/services/trip_api';
import RouteMapComponent from './RouteMapComponent';
import { Trip } from '../../../interfaces/trip';
import Logo from '../../../commons/ui/Logo';

const RouteDetailsComponent: React.FC<unknown> = () => {

  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [activeTab, setActiveTab] = useState('route');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setIsLoading(true);
        const data = await tripApi.getTrip(id);
        setTrip(data);
      } catch (error) {
        console.error('Error fetching trip:', error);
        toast.error('Failed to load trip details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  if (isLoading) {
    return <div className="loading">Loading trip details...</div>;
  }

  if (!trip) {
    return <div className="error">Trip not found</div>;
  }
  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col justify-between items-center bg-gray-100/30 p-4 w-24">
        <div className="flex flex-col items-center">
         <Logo />
          <hr className="border-0 h-px bg-gradient-to-r from-transparent to-gray-300 w-28"  />
        </div>
   
        <div>
          <img
            src="https://placehold.co/50x50"
            alt="User"
            className="rounded-full mb-4"
          />
        </div>
      </div>

      <div className="flex-1 bg-white">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">NORTH CAROLINA</h2>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700">Shortest route</button>
            <button className="text-gray-700">Route settings</button>
          </div>
        </div>

        <div className="flex">
          <div className="relative flex-1">
          <RouteMapComponent trip={trip} />
          </div>

          <div className="w-80 bg-gray-50 px-6 py-4 overflow-y-auto">
            <div className="text-gray-700 text-xs uppercase">STEP 1 OF 3</div>
            <div className="mt-2">
              <select className="w-full border border-gray-300 rounded-md py-2 px-4 text-sm">
                <option>All statuses</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Draft</option>
              </select>
            </div>
            <div className="mt-4 space-y-4">
              {trip.stops.map((stop, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-400 rounded-full w-6 h-6"></div>
                    <div className="flex flex-col">
                      <span className="text-gray-800 text-sm">{stop.location}</span>
                    </div>
                  </div>
  
                </div>
              ))}
            </div>

            <div className="mt-8 bg-red-500 text-white py-3 rounded-md">
              <span className="text-sm">Checked 3 Properties</span>
              <span className="block text-xs">Approximate trip duration is 6 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDetailsComponent;