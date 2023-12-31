import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { RegistrationInterface } from "../Types";

const RegistrationModal = ({ toggleRegistrationModal }: any) => {
  const [registrationInfo, setRegistrationInfo] =
    useState<RegistrationInterface>({
      fullname: "",
      contactNumber: "",
      email: "",
      password: "",
    });

  const [error, setError] = useState<string>("");

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setRegistrationInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/register`,
        registrationInfo
      );

      toast("Successful Registration!", {
        type: "success",
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        toggleRegistrationModal();
      }, 2000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          const responseStatus = axiosError.response.status;
          if (responseStatus === 409) {
            setError("Email already exist.");
          } else {
            setError("An error occured.");
          }
        }
      } else {
        setError((err as Error).message);
      }
    }
  };

  return (
    <div className="w-[300px] h-[450px] bg-neutral-100 flex flex-col items-center justify-center p-6 rounded-lg">
      <h2>Registration</h2>
      <hr className="w-full mb-5 mt-3" />
      <div className="flex items-center flex-col">
        <label>
          Full name
          <input
            className="w-[250px] rounded border mb-4 p-2 border-solid border-[#ccc]"
            type="text"
            placeholder="Full name"
            name="fullname"
            onChange={onChangeHandler}
          />
        </label>
      </div>

      <div className="flex items-center flex-col">
        <label>
          Email
          <input
            className="w-[250px] rounded border mb-4 p-2 border-solid border-[#ccc]"
            type="text"
            placeholder="Email"
            name="email"
            onChange={onChangeHandler}
          />
        </label>
      </div>

      <div className="flex items-center flex-col">
        <label>
          Contact Number
          <input
            className="w-[250px] rounded border mb-4 p-2 border-solid border-[#ccc]"
            type="text"
            placeholder="Contact Number"
            name="contactNumber"
            onChange={onChangeHandler}
          />
        </label>
      </div>

      <div className="flex items-center flex-col">
        <label>
          Password
          <input
            className="w-[250px] rounded border mb-4 p-2 border-solid border-[#ccc]"
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChangeHandler}
          />
        </label>
      </div>
      {error && (
        <span
          style={{ color: "red", paddingTop: "5px", paddingBottom: "10px" }}
        >
          {error}
        </span>
      )}
      <div className="flex items-center gap-2.5">
        <button
          className="bg-[#3f51b5] text-white rounded cursor-pointer px-4 py-2 border-[none] hover:bg-[#2c387e]"
          onClick={handleSubmit}
        >
          Register
        </button>
        <button
          className="bg-[#3f51b5] text-white rounded cursor-pointer px-4 py-2 border-[none] hover:bg-[#2c387e]"
          style={{ backgroundColor: "red" }}
          onClick={toggleRegistrationModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RegistrationModal;
