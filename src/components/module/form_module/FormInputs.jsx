import React from "react";
import { useEffect, useState } from "react";
// component
import { Toastify } from "../toast_module/Toastify";
// data
import data from "../../../data/db.json";
import { MdRemoveRedEye } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function FormInputs() {
  const navigate = useNavigate();
  useEffect(() => {
    const validateUser = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/auth/whoami", {
          withCredentials: true,
        });
        if (res.request.status == 200) {
          navigate("/dashboard");
        }
      } catch (error) {
        // .catch((error) => console.log(error.response.data.message));
        console.log(error.response.data.message);
      }
    };
    validateUser();
  }, []);
  const [status, setStatus] = useState(false);
  const [form, setForm] = useState({
    pcId: "",
    course: "",
    password: "",
    username: "",
  });
  const [checked, setChecked] = useState({
    pcId: false,
    password: false,
    username: false,
    course: false,
  });
  const [isShow, setIsShow] = useState(false);
  const changeHandler = (e) => {
    const { value, name } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!form.course) {
      Toastify("error", "لطفا نام دوره را انتخاب نمایید");
      return;
    }
    if (!form.pcId) {
      Toastify("error", "لطفا شماره سیستم را انتخاب کنید");
      return;
    }
    if (!form.username.trim().length) {
      Toastify("error", "لطفا نام کاربری را وارد کنید");
      return;
    } else if (form.username.length < 3) {
      Toastify("error", "نام کاربری بیشتر از 3 کاراکتر باشد");
      return;
    }
    if (!form.password) {
      Toastify("error", "لطفا پسورد را درست وارد کنید");
      return;
    }
    if (form.password.length < 8 || form.password.length >= 32) {
      Toastify("error", "پسورد کمتر از 8 کاراکتر یا بیشتر از 32 کاراکتر است");
      return;
    }
    setStatus(true);

    axios
      .post(
        "http://localhost:3001/api/auth/login",
        {
          username: form.username,
          password: form.password,
          pcId: form.pcId,
          course: form.course,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setStatus(false);
        if (res.data.statusCode == 200) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        if (error.response.status == 401) {
          Toastify("error", "کاربر یافت نشد");
        }
      });
  };

  const focusHandler = (e) => {
    const { name } = e.target;
    setChecked((checked) => ({ ...checked, [name]: true }));
  };

  return (
    <>
      <div className="w-full h-full bg-mainBgImage bg-center bg-cover rounded-xl shadow-[0px_0px_55px_#444]">
        <form
          onSubmit={submitHandler}
          className="w-full h-full flex flex-col items-center justify-center  backdrop-blur-[3px] rounded-xl text-start px-3 relative "
        >
          <div className="w-full gap-2 flex flex-col items-center absolute top-0">
            <img src="../../../../public/images/Logo.png" alt="" />
            <h1 className=" font-bold text-2xl text-white ">
              حضور غیاب انلاین سایت صدرا
            </h1>
          </div>
          <div className="w-full lg:w-8/12 gap-2 flex items-center  justify-center flex-col 2xl:flex-row h-[150px] 2xl:h-[90px]">
            <div className="w-full 2xl:w-6/12 h-[65px]">
              <select
                defaultValue=""
                value={form.course}
                className="select bg-[#1D232A] select-bordered w-full text-[#FFFFFF]"
                onChange={changeHandler}
                onFocus={focusHandler}
                name="course"
              >
                <option value={""} disabled>
                  لطفا نام دوره خود را انتخاب کنید
                </option>
                {data[1].course.map((item) => (
                  <option key={item.id} value={item.value}>
                    {item.title}
                  </option>
                ))}
              </select>
              {checked.course && !form.course && (
                <p className="text-red-700 text-[14px] font-bold block w-full rounded-md px-2 py-[1px] mx-auto">
                  این فیلد اجباری است ان را پرکنید
                </p>
              )}
            </div>
            <div className="w-full 2xl:w-6/12 h-[65px]">
              <select
                defaultValue=""
                value={form.pcId}
                className="select bg-[#1D232A] select-bordered w-full text-[#FFFFFF]"
                onChange={changeHandler}
                onFocus={focusHandler}
                name="pcId"
              >
                <option value={""} disabled>
                  لطفا شماره سیستم خود را انتخاب کنید
                </option>
                {data[0].pcNun.map((item) => (
                  <option key={item.id} value={item.value}>
                    {item.num}
                  </option>
                ))}
              </select>
              {checked.pcId && !form.pcId && (
                <p className="text-red-700 text-[14px] font-bold block w-full rounded-md px-2 py-[1px] mx-auto">
                  این فیلد اجباری است ان را پرکنید
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap justify-center 2xl:flex-nowrap py-2 w-full lg:w-8/12 gap-2  mx-auto text-[#FFFFFF]">
            <div className=" w-full 2xl:w-1/2 h-[70px] ">
              <label className="input input-bordered bg-[#1D232A] flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className="grow placeholder:text-[14px]"
                  name="username"
                  placeholder="نام کاربری"
                  value={form.username}
                  onChange={changeHandler}
                  onFocus={focusHandler}
                />
              </label>
              {checked.username && !form.username && (
                <p className="text-red-700 text-[14px] font-bold block w-full rounded-md px-2 py-[1px] mx-auto">
                  این فیلد اجباری است ان را پرکنید
                </p>
              )}
            </div>
            <div className="w-full 2xl:w-1/2 h-[70px]  text-[#FFFFFF]">
              <div className="w-full input flex bg-[#1D232A]">
                <button
                  type="button"
                  className="pl-1"
                  onClick={() => setIsShow(!isShow)}
                >
                  {isShow ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <MdRemoveRedEye color="#FFFFFF" />
                  )}
                </button>
                <input
                  type={isShow ? "text" : "password"}
                  placeholder="رمز عبور"
                  className="grow placeholder:text-[#FFFFFF]"
                  value={form.password}
                  onChange={changeHandler}
                  onFocus={focusHandler}
                  name="password"
                />
              </div>
              {checked.password && !form.password && (
                <p className="text-red-700 text-[14px] font-bold block w-full rounded-md px-2 py-[1px] mx-auto">
                  این فیلد اجباری است ان را پرکنید
                </p>
              )}
            </div>
          </div>

          <div className="lg:w-8/12 w-full mx-auto">
            <button className="btn btn-block bg-[#0F2B21] outline-none border-none text-white ">
              ثبت
              {status && <span className="loading loading-spinner"></span>}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormInputs;
