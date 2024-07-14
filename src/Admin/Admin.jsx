import React, { useEffect, useRef, useState } from "react";

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
  const change = () => {
    console.log(redirect("/"));
    navigate("/");
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:3001/api/admin/students/all"
      );
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen bg-[#0F2B21] flex items-center justify-end flex-col">
      <p className="text-white">{query.date}</p>
      <p className="text-white">{query.nationalCode}</p>
      <form onSubmit={changeHadndler} className="w-4/5 bg-red-50 flex">
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
        {/* <input
          type="date"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        /> */}
        <input type="submit" value="جستجو" />
      </form>
      <div className="w-4/5 h-[100%] bg-[#e0e0e0]">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>id</th>
                <th>نام کاربری</th>
                <th>شماره کامپیوتر</th>
                <th>کد ملی</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                return (
                  <tr
                    className="hover"
                    key={item.id}
                    onClick={() =>
                      navigate(`/admin/student/${item.nationalCode}`)
                    }
                  >
                    <th>{index + 1}</th>
                    <td>{item.username}</td>
                    <td>{item.pcId}</td>
                    <td>{item?.nationalCode}</td>
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
