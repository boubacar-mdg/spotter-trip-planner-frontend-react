import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RouteMapComponent from "./RouteMapComponent";
import { Trip } from "../../../interfaces/trip";
import Logo from "../../../commons/ui/Logo";
import { StopType } from "../../../enums/stop-type";
import CustomSelect from "../../../commons/ui/CustomSelect";
import SimpleButton from "../../../commons/ui/SimpleButton";
import StopComponent from "./StopComponent";
import { Modal, Tooltip } from "antd";
import { Stop } from "../../../interfaces/stop";
import ELDLog from "../../eld/components/ELDLog";
import { useQuery } from "@tanstack/react-query";
import { showErrorToast } from "../../../commons/services/toast-service";
import { tripApi } from "../../../api/services/trip_api";

const RouteDetailsComponent: React.FC<unknown> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data: trip,
    error,
    isSuccess,
  } = useQuery<Trip>({
    queryKey: ["routeDetails", id],
    queryFn: () => tripApi.getTrip(parseInt(id!, 10)),
  });
  const [stops, setStops] = useState<Stop[] | undefined>(undefined);
  const [search, setSearch] = useState("Filter by");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (isSuccess) {
      setStops(trip.stops);
    }
  }, [isSuccess, trip]);

  useEffect(() => {
    if (search == StopType.NA) {
      setStops(trip?.stops);
      return;
    }

    setStops(trip?.stops?.filter((stop: Stop) => stop.stop_type === search));
  }, [search]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div className="loading">Loading trip details...</div>;
  }

  if (!trip || error || isError) {
    if(error) showErrorToast(error.message);
    return <div className="error">Trip not found</div>;
  }

  return (
    <>
      <Modal
        title=" "
        open={isModalOpen}
        onOk={handleOk}
        okText="OK"
        onCancel={handleCancel}
        width={1000}
      >
        <ELDLog logs={trip.eld_logs} />
      </Modal>
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
              <CustomSelect options={stopTypesArray} onChange={setSearch} />
            </div>
          </div>

          <div className="flex">
            <div className="relative flex-1">
              <RouteMapComponent trip={trip} />
            </div>

            <div className="w-80 bg-gray-50 px-6 py-4 overflow-y-auto flex flex-col justify-between">
              <div className="overflow-auto h-[80vh]">
                <div className="text-gray-700 text-xs uppercase">All Stops</div>
                {trip.stops?.length == 0 ? (
                  "No stops found"
                ) : (
                  <>
                    <div className="mt-4 mb-4 space-y-4">
                      {stops?.map((stop: Stop, index: number) => (
                        <StopComponent key={index} stop={stop} />
                      ))}
                    </div>
                  </>
                )}{" "}
              </div>
              <div className="flex flex-col gap-3">
                  <SimpleButton onClick={() => showModal()} type="submit" title={"See ELD logs for this trip"} />
                  <SimpleButton onClick={() => navigate(`/plan/trip`)} type="submit" title={"Plan new trip"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RouteDetailsComponent;
