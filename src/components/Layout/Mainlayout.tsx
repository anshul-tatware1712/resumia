import { Outlet } from "react-router-dom";

const Mainlayout = () => {
  return (
    <div>
      {/* <Headers /> */}
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Mainlayout;
