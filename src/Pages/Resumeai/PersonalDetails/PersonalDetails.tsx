import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Country, State, City } from "country-state-city";
import { useEffect, useState } from "react";
import { IState, ICity } from "country-state-city";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building,
  ChevronRight,
  Globe,
  Home,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FormInputs } from "../Resumeia";

interface PersonalDetailsProps {
  setStep: (step: number) => void;
  step: number;
}

const PersonalDetails = ({ setStep, step }: PersonalDetailsProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const countryList = Country.getAllCountries();
  const countryCode = watch("countryCode");
  const stateCode = watch("stateCode");
  console.log(step, "step");
  const [stateList, setStateList] = useState<IState[]>([]);
  const [cityList, setCityList] = useState<ICity[]>([]);
  const [phoneCode, setPhoneCode] = useState<string>("");

  useEffect(() => {
    if (countryCode) {
      const states = State.getStatesOfCountry(countryCode);
      setPhoneCode(getValues("phoneCode"));
      setStateList(states);
      setCityList([]);
    }
  }, [countryCode, getValues]);

  useEffect(() => {
    if (countryCode && stateCode) {
      const cities = City.getCitiesOfState(countryCode, stateCode);
      setCityList(cities);
    }
  }, [countryCode, stateCode]);

  const onsubmit = (data: FormInputs) => {
    setStep(step + 1);
    console.log(data, "data");
    console.log("after submition", step);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
      <div className="space-y-4">
        <div className="border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-semibold text-gray-200 flex items-center">
            <User className="mr-2 h-6 w-6 text-blue-400" />
            Personal Details
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
          <div className="col-span-2 sm:col-span-1">
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Full Name
            </Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-gray-500" />
              </div>
              <Input
                id="name"
                type="text"
                className="bg-gray-700 border-gray-600 text-gray-100 pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md"
                placeholder="Enter Name"
                {...register("name", {
                  required: "Name is required",
                })}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message?.toString()}
              </p>
            )}
          </div>

          <div className="col-span-2 sm:col-span-1">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email Address
            </Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-500" />
              </div>
              <Input
                id="email"
                type="email"
                className="bg-gray-700 border-gray-600 text-gray-100 pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md"
                placeholder="example@email.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message?.toString()}
              </p>
            )}
          </div>
        </div>

        <div className="border-b border-gray-700 pb-4 pt-6">
          <h2 className="text-2xl font-semibold text-gray-200 flex items-center">
            <MapPin className="mr-2 h-6 w-6 text-blue-400" />
            Location
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
          <div>
            <Label
              htmlFor="country"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Country
            </Label>
            <Select
              onValueChange={(value) => {
                const country = countryList.find((c) => c.name === value);
                if (country) {
                  setValue("country", country.name);
                  setValue("countryCode", country.isoCode);
                  setValue("phoneCode", country.phonecode);
                  setValue("state", "");
                  setValue("stateCode", "");
                  setValue("city", "");
                }
              }}
            >
              <SelectTrigger
                id="country"
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              >
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Select Country" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                <SelectGroup>
                  <SelectLabel className="text-gray-400">
                    Select Country
                  </SelectLabel>
                  {countryList.map((country) => (
                    <SelectItem
                      key={country.isoCode}
                      value={country.name}
                      className="focus:bg-gray-700"
                    >
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="state"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              State / Province
            </Label>
            <Select
              onValueChange={(value) => {
                const state = stateList.find((s) => s.name === value);
                if (state) {
                  setValue("state", state.name);
                  setValue("stateCode", state.isoCode);
                  setValue("city", "");
                }
              }}
              disabled={!countryCode}
            >
              <SelectTrigger
                id="state"
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              >
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Select State" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                <SelectGroup>
                  <SelectLabel className="text-gray-400">
                    Select State
                  </SelectLabel>
                  {stateList.map((state) => (
                    <SelectItem
                      key={state.isoCode}
                      value={state.name}
                      className="focus:bg-gray-700"
                    >
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="city"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              City
            </Label>
            <Select
              onValueChange={(value) => setValue("city", value)}
              disabled={!stateCode}
            >
              <SelectTrigger
                id="city"
                className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
              >
                <div className="flex items-center">
                  <Home className="h-4 w-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Select City" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                <SelectGroup>
                  <SelectLabel className="text-gray-400">
                    Select City
                  </SelectLabel>
                  {cityList.map((city, index) => (
                    <SelectItem
                      key={index}
                      value={city.name}
                      className="focus:bg-gray-700"
                    >
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
          <div>
            <Label
              htmlFor="pinCode"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Postal / Zip Code
            </Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-4 w-4 text-gray-500" />
              </div>
              <Input
                id="pinCode"
                type="text"
                className="bg-gray-700 border-gray-600 text-gray-100 pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md"
                placeholder="Postal Code"
                {...register("pinCode", {
                  required: "Postal code is required",
                })}
              />
            </div>
            {errors.pinCode && (
              <p className="mt-1 text-sm text-red-500">
                {errors.pinCode.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Phone Number
            </Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-4 w-4 text-gray-500" />
              </div>
              <div className="absolute inset-y-0 left-0 pl-9 flex items-center pointer-events-none">
                {phoneCode && (
                  <span className="text-gray-400 sm:text-sm">+{phoneCode}</span>
                )}
              </div>
              <Input
                id="phone"
                type="tel"
                className={`bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md ${
                  phoneCode ? "pl-20" : "pl-10"
                }`}
                placeholder="Phone Number"
                {...register("phone", {
                  required: "Phone number is required",
                })}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
            >
              Next Step
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </form>
  );
};

export default PersonalDetails;
