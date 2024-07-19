import { ToastContainer } from "react-toastify";
import FormInputs from "../module/form_module/FormInputs";
function Form() {
  return (
    <div className="w-full h-screen flex items-center bg-mainBG justify-center ">
      <div className=" w-[55%] h-[70%] flex ">
        <div className="w-full h-full pb-2 relative">
          <FormInputs />
        </div>
        {/* <div className="w-1/2 h-[98.7%] pt-[2px] mt-[2px] overflow-hidden rounded-l-xl bg-red-500 bg-mainBgImage bg-center bg-cover">
          <img
            className="block mx-auto mt-5"
            src="../../../public/images/Logo.png"
            alt="logo"
          />
        </div> */}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Form;
