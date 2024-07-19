import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/auth/whoami", {
          withCredentials: true,
        });

        // console.log(res.data.role);
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
