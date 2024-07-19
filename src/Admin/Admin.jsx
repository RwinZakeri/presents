import React, { useEffect, useRef, useState } from "react";
import { TiDocumentText } from "react-icons/ti";
import { FaPen } from "react-icons/fa";

// date
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import { Link, redirect, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
function Admin() {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    nationalCode: "",
    date: "",
  });
  const [data, setData] = useState([]);
  const dateTag = useRef();
  // const selectDay = (e) => {
  //   console.log(selectedDay);
  //   console.log(Object.values(e).join("/"));
  //   setSelectedDay(() => Object.values(e).join("/"));
  // };

  const changeHadndler = (e) => {
    e.preventDefault();
    setQuery({ nationalCode: e.target[1].value, date: e.target[0].value });
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/auth/whoami", {
          withCredentials: true,
        });
        // console.log(res.data.role);
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
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:3001/api/admin/students/all",
        {
          withCredentials: true,
        }
      );
      setData(res.data);
    };
    fetchData();
  }, []);
  const clickHandler = () => {
    axios
      .get("http://localhost:3001/api/auth/logout", {
        withCredentials: true,
      })
      .then((res) => navigate("/"));
  };
  return (
    <div className="w-full h-auto  bg-mainBG flex items-center justify-end flex-col">
      <div className="w-4/5 h-auto flex items-center justify-between py-2">
        <Link to={"/admin/logs"}>
          <button className="btn relative group transition-all">
            <TiDocumentText size={24} />
            <div className="w-[100px] h-[48px] absolute left-[-95px] bg-[#E8E8E8] opacity-0 items-center justify-center translate-x-[80px] group-hover:flex group-hover:translate-x-0 group-hover:duration-300 group-hover:opacity-100 rounded-l-xl">
              لاگ ها
            </div>
          </button>
        </Link>

        <button
          className="btn btn-error sticky left-0 block"
          onClick={clickHandler}
        >
          خروج
        </button>
      </div>
      {/* <form onSubmit={changeHadndler} className="w-4/5 bg-red-50 flex">
        <input
          type="text"
          placeholder="نام کاربری"
          className="input input-bordered w-full max-w-xs"
          name="nationalCode"
        />
        <DatePicker
          ref={dateTag}
          style={{ height: "48px", width: "100%" }}
          calendar={persian}
          locale={persian_en}
          name="date"
        />
        ;
        <input
          type="date"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <input type="submit" value="جستجو" />
      </form> */}
      <div className="w-4/5 h-[100%] bg-[#e0e0e0] overflow-x-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>id</th>
                <th>نام کاربری</th>
                <th>شماره کامپیوتر</th>
                <th>کد ملی</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                return (
                  <tr
                    className={`hover ${
                      (item.username == "broken" ||
                        item.username == "nobody") &&
                      "bg-red-200"
                    }`}
                    key={item.id}
                  >
                    <th
                      onClick={() =>
                        navigate(`/admin/logs/${item.nationalCode}`)
                      }
                    >
                      <TiDocumentText />
                    </th>
                    <td>{item.username}</td>
                    <td>{item.pcId}</td>
                    <td className="max-w-12 ">{item?.nationalCode}</td>
                    <td
                      className="text-center flex items-center justify-center"
                      onClick={() =>
                        navigate(`/admin/edit/${item?.nationalCode}`)
                      }
                    >
                      <FaPen />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
