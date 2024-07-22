import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState({
    sec: 0,
    min: 0,
    hours: 0,
  });
  // date
  useEffect(() => {
    const locatedTime = localStorage?.getItem("time")?.split(",");

    // Ensure locatedTime is properly parsed and has valid values
    if (locatedTime && locatedTime.length === 3) {
      locatedTime.forEach((time, index) => {
        locatedTime[index] = parseInt(time, 10);
      });
    }

    setInterval(() => {
      const currentTime = new Date();
      let hours = currentTime.getHours();
      let minutes = currentTime.getMinutes();
      let seconds = currentTime.getSeconds();

      if (locatedTime && locatedTime.length === 3) {
        let diffHours = hours - locatedTime[0];
        let diffMinutes = minutes - locatedTime[1];
        let diffSeconds = seconds - locatedTime[2];

        // Handle negative differences
        if (diffSeconds < 0) {
          diffSeconds += 60;
          diffMinutes--;
        }
        if (diffMinutes < 0) {
          diffMinutes += 60;
          diffHours--;
        }
        if (diffHours < 0) {
          diffHours += 24;
        }

        setCounter({
          sec: diffSeconds.toString().padStart(2, "0"),
          min: diffMinutes.toString().padStart(2, "0"),
          hours: diffHours.toString().padStart(2, "0"),
        });
      } else {
        setCounter({
          sec: seconds.toString().padStart(2, "0"),
          min: minutes.toString().padStart(2, "0"),
          hours: hours.toString().padStart(2, "0"),
        });
      }
    }, 1000);

    // let hours = currentTime.getHours();
    // let minutes = currentTime.getMinutes();
    // let seconds = currentTime.getSeconds();
    // localStorage.getItem("time", [hours, minutes, seconds]);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/auth/whoami", {
          withCredentials: true,
        });

        if (res.data.role == "ADMIN") {
          console.log("ADMIN logged in ");
          navigate("/admin");
        }
        setData(res.data);
      } catch (error) {
        if (error.response.status == 401) {
          navigate("/");
        }
      }
    };
    fetchData();
  }, [navigate]);

  const clickHandler = () => {
    axios
      .get("http://localhost:3001/api/auth/logout", {
        withCredentials: true,
      })
      .then((res) => navigate("/"));
  };
  return (
    <div className="w-full h-screen bg-mainBG flex flex-col items-center justify-center ">
      <div className="container w-100% max-w-[600px] h-[60%] shadow-[inset_0px_0px_10px_0px_#2b2b2b] relative bg-white p-2">
        <div className="overflow-x-auto">
          <table className="table h-32">
            {/* head */}
            <thead className="h-16">
              <tr>
                <th></th>
                <th>نام کاربری </th>
                <th>نام</th>
                <th>نام خانوادگی </th>
                <th>کد ملی </th>
                <th className="text-center">شماره سیستم </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="hover">
                <th></th>
                <td>{data.username}</td>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.nationalCode}</td>
                <td className="text-center">{data.pcId}</td>
              </tr>
              {/* row 2 */}
            </tbody>
          </table>
        </div>
        <div className="w-full mt-4 flex items-start justify-center">
          <div className="grid grid-flow-col gap-2 text-center auto-cols-max">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": counter.sec }}></span>
              </span>
              sec
            </div>
            <div className="flex items-center text-2xl">
              <span>:</span>
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": counter.min }}></span>
              </span>
              min
            </div>
            <div className="flex items-center text-2xl">
              <span>:</span>
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": counter.hours }}></span>
              </span>
              hours
            </div>
          </div>
        </div>
        <p className="text-[#FF5861] text-center mt-4">
          *حداکثر تا 5 ساعت لاگین باشید*
        </p>
        <button
          className="btn btn-error btn-wide absolute left-[calc(70%_-256px)]  bottom-2 "
          onClick={clickHandler}
        >
          خروج
        </button>
      </div>
    </div>
  );
}

export default DashBoard;
