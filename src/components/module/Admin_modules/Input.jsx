import React, { useEffect, useState } from "react";
// component
import { Toastify } from "../toast_module/Toastify";
// data
import data from "../../../data/db.json";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function InputEdit({
  id,
  name,
  placeholder,
  typeInput,
  placholderValue,
  formData,
  setFormData,
  stuId,
}) {
  const navigate = useNavigate();
  const [userEditData, setUserEditData] = useState([]);
  const myArr = ["nationalCode", "pcId", "username"];

  useEffect(() => {
    const fetchData = async () => {
      const responseTwo = await axios.get(
        `http://localhost:3001/api/admin/students/student/${stuId}`,
        { withCredentials: true }
      );
      setUserEditData(responseTwo.data);
      setFormData({
        pcId: responseTwo?.data?.pcId,
        username: responseTwo?.data?.username,
        nationalCode: responseTwo?.data?.nationalCode,
        name: responseTwo?.data?.firstName || "",
        lastname: responseTwo?.data?.lastName || "",
      });
    };
    fetchData();
    const fetchUserRole = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/auth/whoami", {
          withCredentials: true,
        });
        if (res.data.role == "USER") {
          navigate("/dashboard");
        }
      } catch (error) {
        if (error.response.status == 401) {
          navigate("/");
        }
        // if()
      }
    };
    fetchUserRole();
  }, []);

  const changeHandler = (e) => {
    const { value } = e.target;
    const { name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clickHandler = () => {
    const postData = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3001/api/admin/students/change/${stuId}`,
          {
            username: formData.username,
            firstName: formData.name,
            pcId: formData.pcId,
            nationalCode: formData.nationalCode,
            lastName: formData.lastname,
          },
          {
            withCredentials: true,
          }
        );
        if (res.status == 200) {
          Toastify("success", "دیتا با موفقیت ثبت شد");
        } else {
          Toastify("error", "مشکلی پیش امده");
        }
      } catch (error) {
        Toastify("error", error.message);
      }
    };
    postData();
  };

  return (
    <>
      {typeInput !== "select" ? (
        <div className="w-full">
          <label className="input input-bordered bg-[#1D232A] flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="#fff"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow placeholder:text-[14px] text-white"
              name={name}
              placeholder={`${placeholder} | ${
                name == "username"
                  ? userEditData?.username
                  : name == "nationalCode"
                  ? userEditData?.nationalCode
                  : name == "lastname"
                  ? userEditData.lastName
                  : name == "name"
                  ? userEditData.firstName
                  : ""
              }`}
              value={
                name == "nationalCode"
                  ? formData?.nationalCode
                  : name == "name"
                  ? formData?.name
                  : name == "lastname"
                  ? formData?.lastname
                  : name == "username"
                  ? formData?.username
                  : ""
              }
              onChange={changeHandler}
            />
          </label>
        </div>
      ) : (
        <div className="col-span-2">
          <select
            value={formData.pcId}
            className="select bg-[#1D232A] select-bordered w-full text-[#FFFFFF]"
            onChange={changeHandler}
            name="pcId"
          >
            <option value="" disabled>
              لطفا شماره سیستم را انتخاب کنید | {userEditData.pcId}
            </option>
            {data[0].pcNun.map((item) => (
              <option key={item.id} value={item.value}>
                {item.num}
              </option>
            ))}
          </select>
          <button
            onClick={clickHandler}
            className="btn block mx-auto mt-5 btn-wide btn-success"
          >
            ثبت
          </button>
        </div>
      )}
    </>
  );
}

export default InputEdit;
