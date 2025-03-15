import Animation from "../../assets/images/Animation.gif";
const Spinner = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-purple-900/50 z-50">
      <img src={Animation} alt="Loading..." />
    </div>
  );
};

export default Spinner;
