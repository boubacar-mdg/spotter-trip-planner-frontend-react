import { Route, Routes } from "react-router-dom";
import RouteDetailsComponent from "./modules/route/components/RouteDetailsComponent";
import ResourceNotFound from "./commons/components/ResourceNotFound";
import PlanTripComponent from "./modules/trip/components/PlanTripComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient()
  return (
    <>
     <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<PlanTripComponent />} />
        <Route path="/plan/trip" element={<PlanTripComponent />} />
        <Route path="/route/details/:id" element={<RouteDetailsComponent />} />
        <Route path="*" element={<ResourceNotFound />} />
      </Routes>
    </QueryClientProvider>
    </>
  );
}

export default App;
