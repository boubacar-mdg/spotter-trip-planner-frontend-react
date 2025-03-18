import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ResourceNotFound() {
  return (
    <>
      <main className="h-screen w-screen flex justify-center items-center bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-[#008080]">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Resource Not Found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            No resource found at this location. Please check the URL in the
            address bar and try again.
          </p>
          <Link
            to="/plan/trip"
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex gap-3 items-center justify-center bg-[#008080] text-white hover:opacity-90 font-medium rounded-lg text-[11px] lg:text-[13px] px-4 py-3 focus:outline-none"
            >
              Return to home page
            </motion.button>
          </Link>
        </div>
      </main>
    </>
  );
}

export default ResourceNotFound;
