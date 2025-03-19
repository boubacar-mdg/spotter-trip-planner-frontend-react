import { apiUrl } from '../../config/api.config';
import { TripPlannerPayload } from '../../interfaces/payload';
import axiosInstance from '../axios/axiosIstance';

const tripApi = {
  createTrip: async (tripData: TripPlannerPayload) => {
    try {
      const response = await axiosInstance.post(`${apiUrl}/trips/`, tripData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  calculateRoute: async (tripId: number) => {
    try {
      const response = await axiosInstance.post(`${apiUrl}/trips/${tripId}/determine_route_stops/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getTrip: async (tripId: number) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/trips/${tripId}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getAllTrips: async () => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/trips/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export { tripApi };