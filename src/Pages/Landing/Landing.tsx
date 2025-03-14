import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/auth")}>Signup</Button>
    </div>
  );
};

export default Landing;
