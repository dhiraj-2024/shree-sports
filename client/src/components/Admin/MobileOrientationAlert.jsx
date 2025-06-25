import { useEffect, useState } from "react";

const MobileOrientationAlert = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setShowAlert(true);
                const timer = setTimeout(() => setShowAlert(false), 30000);
                return () => clearTimeout(timer);
            }
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!isMobile || !showAlert) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs mx-auto">
                <div className="text-center">
                    <div className="text-lg font-bold mb-2">For Better View</div>
                    <p className="mb-4">Please rotate your device to landscape mode</p>
                    <button
                        onClick={() => setShowAlert(false)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileOrientationAlert;
