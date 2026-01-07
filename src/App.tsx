import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ToastContainer />
      <Outlet />
    </Suspense>
  );
}

export default App;
