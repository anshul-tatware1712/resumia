import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
import hero from "../../assets/images/hero.jpg";
import { useState } from "react";
import Login from "@/components/Login/Login";
import Register from "@/components/Register/Register";

export function AuthPage() {
  const [active, setActive] = useState<string>("login");
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-6 ">
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl bg-black/10 backdrop-blur-lg border border-white/10">
        <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 h-full">
          <CardContainer className="inter-var">
            <CardBody className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 relative group/card border-white/20 w-full max-w-md  rounded-2xl p-8 border h-[490px]">
              <CardItem
                translateZ="60"
                className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300"
              >
                Build the Perfect Resume
              </CardItem>
              <CardItem
                as="p"
                translateZ="70"
                className="text-purple-200 text-sm max-w-sm mt-3"
              >
                Tailor your resume with AI suggestions for your dream job.
                ATS-friendly formatting guaranteed!
              </CardItem>
              <CardItem translateZ="120" className="w-full mt-6">
                <img
                  src={hero}
                  className="h-64 w-full object-cover rounded-xl group-hover/card:shadow-xl group-hover/card:shadow-purple-500/20"
                  alt="Hero"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
        <div className="pt-15 md:pt-0 w-full md:w-1/2 ">
          {active === "login" ? (
            <Login setActive={setActive} />
          ) : (
            <Register setActive={setActive} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
