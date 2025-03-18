import { Route, Routes } from "react-router-dom";
import RouteDetailsComponent from "./modules/route/components/RouteDetailsComponent";
import ResourceNotFound from "./commons/components/ResourceNotFound";
import AddTripComponent from "./modules/trip/components/AddTripComponent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/add/trip" element={<AddTripComponent />} />
        <Route path="/route/details/:id" element={<RouteDetailsComponent />} />
        <Route path="*" element={<ResourceNotFound />} />
      </Routes>
    </>
  );
}

export default App;
