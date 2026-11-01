import Navbar from "../components/common/Navbar";

function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="max-w-6xl mx-auto py-6">
                {children}
            </main>
        </div>
    );
}

export default MainLayout;