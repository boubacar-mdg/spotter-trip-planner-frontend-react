import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { tripApi } from "../../../api/services/trip_api";
import RouteMapComponent from "./RouteMapComponent";
import { Trip } from "../../../interfaces/trip";
import Logo from "../../../commons/ui/Logo";
import { StopType } from "../../../enums/stop-type";
import CustomSelect from "../../../commons/ui/CustomSelect";
import SimpleButton from "../../../commons/ui/SimpleButton";
import StopComponent from "./StopComponent";
import { Tooltip } from "antd";
import { Stop } from "../../../interfaces/stop";

const RouteDetailsComponent: React.FC<unknown> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [stops, setStops] = useState<Stop[] | undefined >(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("Filter by");
  

  const stopTypesArray: {
    key: string;
    name: string;
  }[] = [
    { key: StopType.NA, name: "Filter by" },
    { key: StopType.START, name: "Starting" },
    { key: StopType.REST, name: "Resting" },
    { key: StopType.FUEL, name: "Fueling" },
    { key: StopType.PICKUP, name: "Pickup" },
    { key: StopType.DROPOFF, name: "Dropoff" },
  ];

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setIsLoading(true);
        const data = await tripApi.getTrip(id);
        setTrip(data);
        setStops(data.stops);
      } catch (error) {
        console.error("Error fetching trip:", error);
        toast.error("Failed to load trip details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrip();
  }, [id]);


  useEffect(() => {
    if(search == StopType.NA) {
      setStops(trip?.stops);
      return;
    } 
    
    setStops(trip?.stops?.filter((stop) => stop.stop_type === search));
  }, [search]);

  if (isLoading) {
    return <div className="loading">Loading trip details...</div>;
  }

  if (!trip) {
    return <div className="error">Trip not found</div>;
  }
  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col justify-between items-center bg-gray-100/30 p-4 w-24">
        <div className="flex flex-col py-4 items-center">
          <Logo />
          <hr className="border-0 h-px bg-gradient-to-r from-transparent to-gray-300 w-28" />
        </div>

        <Tooltip title={"Boubacar Demba Mandiang"} placement="right">
          <img
            src="https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg"
            alt="User"
            className="rounded-full h-10 mb-4"
          />
        </Tooltip>
      </div>

      <div className="flex-1 bg-white">
        <div className="flex items-center justify-between px-6 py-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
              To {trip.dropoff_location}
            </h1>
            <p className="text-gray-500 mt-1">From {trip.pickup_location}</p>
          </div>

          <div className="flex space-x-4 position">
            {/* <SearchInput
              title="Search by"
              placeholder="rest, start..."
              onChange={setSearch}
              value={search}
              options={stopTypesArray?.map((item) => ({
                label: item.key,
                value: item.name,
              }))}
              dropdown
              enableBorder
              separator={false}
              backgroundColor="bg-white"
            /> */}

            <CustomSelect options={stopTypesArray} onChange={setSearch} />
          </div>
        </div>

        <div className="flex">
          <div className="relative flex-1">
            <RouteMapComponent trip={trip} />
          </div>

          <div className="w-80 bg-gray-50 px-6 py-4 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="text-gray-700 text-xs uppercase">All Stops</div>
              <div className="mt-4 space-y-4">
                {stops?.map((stop, index) => (
                  <StopComponent key={index} stop={stop}/>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">

            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                navigate(`/trip/eld/${id}/logs`);
              }}
            >
              <SimpleButton
                type="submit"
                title={"See ELD logs for this trip"}
              />
            </form>
            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                navigate(`/plan/trip`);
              }}
            >
              <SimpleButton
                type="submit"
                title={"Plan new trip"}
              />
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDetailsComponent;
