import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function AdminLogs() {
  const [selected, setSelected] = useState("day");
  const [data, setData] = useState([]);
  const { id } = useParams();
  const clickHandler = (e) => {
    setSelected(e.target.attributes.id?.textContent);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:3001/api/admin/students/logs/${selected}`,
        {
          withCredentials: true,
        }
      );
      setData(res.data.logs);
    };
    fetchData();
  }, [selected]);
  // data?.am?.filter((item) => item.stuId.nationalCode == id)
  return (
    <div className="w-full bg-[#0F2B21] overflow-x-hidden">
      <div className="w-4/5 h-11 bg-slate-300 mx-auto flex items-center gap-3">
        <label htmlFor="day" className="flex gap-3" onClick={clickHandler}>
          روز
          <input
            id="day"
            type="radio"
            name="radio-5"
            className="radio radio-success"
            defaultChecked
          />
        </label>
        <label htmlFor="month" className="flex gap-3" onClick={clickHandler}>
          ماه
          <input
            id="month"
            type="radio"
            name="radio-5"
            className="radio radio-success"
          />
        </label>
        <label
          htmlFor="nationalcode"
          className="flex gap-3"
          onClick={clickHandler}
        >
          کد ملی
          <input
            id="nationalcode"
            type="radio"
            name="radio-5"
            className="radio radio-success"
            disabled
          />
        </label>
      </div>

      <div className="w-4/5 mx-auto max-h-[100vh] bg-white overflow-y-scroll">
        <div className="overflow-x-auto h-[100vh]">
          <table className="table h-full">
            <thead className="sticky top-0 bg-slate-200">
              <tr>
                <th>id</th>
                <th>نام و نام خانوادگی</th>
                <th>دوره</th>
                <th>کد ملی</th>
                <th>شماره سیستم</th>
                <th>ورود - خروج</th>
              </tr>
            </thead>
            <tbody>
              {id
                ? data?.am
                    ?.filter((item) => item?.stuId?.nationalCode == id)
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {item?.stuId?.firstName} {item?.stuId?.lastName}
                        </td>
                        <td>{item?.course}</td>
                        <td>{item?.stuId?.nationalCode}</td>
                        <td>{item?.stuId?.pcId}</td>
                        <td>
                          {item?.entrance ? item?.entrance : "وارد نشده"} -{" "}
                          {item?.exit ? item?.exit : "خارج نشده"}
                        </td>
                      </tr>
                    ))
                : data?.am?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {item?.stuId?.firstName} {item?.stuId?.lastName}
                      </td>
                      <td>{item?.course}</td>
                      <td>{item?.stuId?.nationalCode}</td>
                      <td>{item?.stuId?.pcId}</td>
                      <td>
                        {item?.entrance ? item?.entrance : "وارد نشده"} -{" "}
                        {item?.exit ? item?.exit : "خارج نشده"}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      <h1 className="w-4/5 mx-auto text-white text-[25px] text-center h-24 bg-green-800 leading-[6rem]">
        بعد از ظهر
      </h1>

      <div className="w-4/5 mx-auto h-full bg-white overflow-y-scroll max-h-[100vh]">
        <div className="overflow-x-auto h-[100vh]">
          <table className="table h-full ">
            <thead className="sticky top-0 bg-slate-300">
              <tr>
                <th>id</th>
                <th>نام و نام خانوادگی</th>
                <th>دوره</th>
                <th>کد ملی</th>
                <th>شماره سیستم</th>
                <th>ورود - خروج</th>
              </tr>
            </thead>
            <tbody>
              {id
                ? data?.pm
                    ?.filter((item) => item.stuId?.nationalCode == id)
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {item?.stuId?.firstName} {item?.stuId?.lastName}
                        </td>
                        <td>{item?.course}</td>
                        <td>{item?.stuId?.nationalCode}</td>
                        <td>{item?.stuId?.pcId}</td>
                        <td>
                          {item?.entrance ? item?.entrance : "وارد نشده"} -{" "}
                          {item?.exit ? item?.exit : "خارج نشده"}
                        </td>
                      </tr>
                    ))
                : data?.pm?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {item?.stuId?.firstName} {item?.stuId?.lastName}
                      </td>
                      <td>{item?.course}</td>
                      <td>{item?.stuId?.nationalCode}</td>
                      <td>{item?.stuId?.pcId}</td>
                      <td>
                        {item?.entrance ? item?.entrance : "وارد نشده"} -{" "}
                        {item?.exit ? item?.exit : "خارج نشده"}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminLogs;
