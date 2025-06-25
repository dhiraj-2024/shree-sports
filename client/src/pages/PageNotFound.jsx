// client/src/pages/PageNotFound.jsx
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <section className="flex-grow flex items-center justify-center py-16">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-dark-blue mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
        <p className="mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-gold text-dark-blue font-bold py-3 px-8 rounded-lg hover:bg-yellow-600 transition inline-block"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}
