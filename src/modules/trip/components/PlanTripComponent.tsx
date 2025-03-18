import { useState } from "react";
import Title from "../../../commons/ui/Title";
import { useNavigate } from "react-router-dom";
import Input from "../../../commons/ui/Input";
import SimpleButton from "../../../commons/ui/SimpleButton";
import { tripApi } from "../../../api/services/trip_api";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../commons/services/toast-service";
import { Spin } from "antd";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import Logo from "../../../commons/ui/Logo";

const PlanTripComponent: React.FC<unknown> = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    current_location: "",
    pickup_location: "",
    dropoff_location: "",
    current_cycle_hours: 0,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "current_cycle_hours" ? parseFloat(value) : value,
    });
  };

  const handlePlanTrip = async (e: any) => {
    e.preventDefault();

    if (
      !formData.current_location ||
      !formData.pickup_location ||
      !formData.dropoff_location
    ) {
      showErrorToast("Please fill in all location fields");
      return;
    }

    if (formData.current_cycle_hours < 0 || formData.current_cycle_hours > 11) {
      showErrorToast("Current cycle hours must be between 0 and 11");
      return;
    }

    try {
      setIsLoading(true);
      const trip = await tripApi.createTrip(formData);

      await tripApi.calculateRoute(trip.id);

      showSuccessToast("A new trip has been created successfully");
      navigate(`/route/details/${trip.id}`);
    } catch (error) {
      console.error("Error creating trip:", error);
      showErrorToast("Failed to create trip. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="flex min-h-screen  flex-col px-6 py-12 lg:px-8 bg-custom-gradient"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-between">
          <Title title="Trip Planner" size="text-[28px]" />
          <div className="mt-20">
            <Logo />
          </div>
        </div>

        <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handlePlanTrip}>
            <Input
              id="current_location"
              name="current_location"
              type="text"
              placeholder="City, State or Full Address"
              label="Current location"
              value={formData.current_location}
              onChange={handleInputChange}
            />

            <Input
              id="pickup_location"
              name="pickup_location"
              type="text"
              placeholder="City, State or Full Address"
              label="Pickup location"
              value={formData.pickup_location}
              onChange={handleInputChange}
            />

            <Input
              id="dropoff_location"
              name="dropoff_location"
              type="text"
              placeholder="City, State or Full Address"
              label="Dropoff location"
              value={formData.dropoff_location}
              onChange={handleInputChange}
            />

            <Input
              id="current_cycle_hours"
              name="current_cycle_hours"
              type="number"
              placeholder="Current cycle number (hours 0-11)"
              label="Current cycle number (hours 0-11)"
              value={formData.current_cycle_hours}
              onChange={handleInputChange}
            />

            <SimpleButton
              py={40}
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              title={isLoading ? "Calculating" : "Plan Trip"}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default PlanTripComponent;
