import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// data
import inputsData from "../data/db.json";
import InputEdit from "../components/module/Admin_modules/Input";
import axios from "axios";
import { ToastContainer } from "react-toastify";
function AdminEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    pcId: "",
    nationalCode: "",
    username: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3001/api/auth/whoami", {
        withCredentials: true,
      });
      if (res.data.role !== "ADMIN") {
        navigate("/");
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full h-screen bg-mainBG ">
      <div className="container w-6/12 h-4/5 bg-white mx-auto relative rounded-xl p-2 top-1/2 -translate-y-1/2">
        <div className="w-full mb-4">
          <h1 className="text-center text-xl h-12 font-semibold leading-[48px]">
            فرم ویرایش کاربر با کدملی : {id !== "undefined" ? id : "تعریف نشده"}
          </h1>
        </div>
        <div className="w-full grid grid-cols-2 gap-1">
          {inputsData[2].inputsData.map((item) => {
            return (
              <>
                <InputEdit
                  setFormData={setFormData}
                  formData={formData}
                  {...item}
                  stuId={id}
                />
              </>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminEdit;
