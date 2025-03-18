import { FC } from 'react';
import { Stop } from '../../../interfaces/stop';
import { Tooltip } from 'antd';

const StopComponent: FC<{stop: Stop}> = ({stop}) => {
      const getStopTypeLabel = (type: any) => {
        switch (type) {
          case 'start': return 'Starting Point';
          case 'pickup': return 'Pickup';
          case 'dropoff': return 'Dropoff';
          case 'rest': return 'Rest Period';
          case 'fuel': return 'Fuel Stop';
          default: return type;
        }
      };
    
      const getStopIcon = (type: any) => {
        switch (type) {
          case 'start': return '⚫';
          case 'pickup': return '📦';
          case 'dropoff': return '🏁';
          case 'rest': return '🛏️';
          case 'fuel': return '⛽';
          default: return '📍';
        }
      };

    const formatDateTime = (dateTimeStr: any) => {
        if (!dateTimeStr) return 'N/A';
        return new Date(dateTimeStr).toLocaleString();
      };
    
      const calculateDuration = (arrival: any, departure: any) => {
        if (!arrival || !departure) return 'N/A';
        
        const arrivalTime = new Date(arrival).getTime();
        const departureTime = new Date(departure).getTime();
        const durationMs = departureTime - arrivalTime;
        
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${hours}h ${minutes}m`;
      };
  return (
    <Tooltip title={`Arrival Time: ${formatDateTime(stop.arrival_time)}\nDeparture Time: ${formatDateTime(stop.departure_time)}`} placement="top">

    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:opacity-70 transition">
      
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>

      
      <div className="flex-grow">
        <h2 className="text-[12px] font-bold text-gray-800">{stop.location}</h2>
        <p className="text-gray-500">{getStopTypeLabel(stop.stop_type)}</p>
      </div>
      
      <div className="flex items-center">
        <span className="text-gray-500 mr-4 text-[11px] font-bold">{calculateDuration(stop.arrival_time, stop.departure_time)}</span>
        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
          {getStopIcon(stop.stop_type)}
        </div>
      </div>
    </div>
    
    </Tooltip>
  );
};

export default StopComponent;