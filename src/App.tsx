import { Route, Routes } from "react-router-dom";
import RouteDetailsComponent from "./modules/route/components/RouteDetailsComponent";
import ResourceNotFound from "./commons/components/ResourceNotFound";
import PlanTripComponent from "./modules/trip/components/PlanTripComponent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/plan/trip" element={<PlanTripComponent />} />
        <Route path="/route/details/:id" element={<RouteDetailsComponent />} />
        <Route path="*" element={<ResourceNotFound />} />
      </Routes>
    </>
  );
}

export default App;
