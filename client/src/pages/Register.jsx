// client/src/pages/Register.jsx
import { Outlet, Link, useLocation } from "react-router-dom";

export default function Register() {
  const location = useLocation();
  const isGymnastics = location.pathname.includes("gymnastics");
  const isAdultFitness = location.pathname.includes("adult-fitness");

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-dark-blue">
          Registration <span className="text-gold">Form</span>
        </h2>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Form Tabs */}
          <div className="flex border-b border-gray-200">
            <Link
              to="gymnastics"
              className={`flex-1 py-4 px-6 text-center font-medium ${
                isGymnastics
                  ? "bg-gold text-dark-blue"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Gymnastics Class
            </Link>
            <Link
              to="adult-fitness"
              className={`flex-1 py-4 px-6 text-center font-medium ${
                isAdultFitness
                  ? "bg-gold text-dark-blue"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Adult Fitness Batch
            </Link>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
