import { Navigate, Route, Routes } from "react-router-dom";
import Form from "./components/form-component/Form";
import Admin from "./Admin/Admin";
import StudentDetail from "./components/module/student_module/StudentDetail";
import DashBoard from "./components/module/dashboard/Dashboard";
import AdminLogs from "./Admin/AdminLogs";
import AdminEdit from "./Admin/AdminEdit";
function App() {
  return (
    <div className="w-screen h-screen font-iranYkan">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/edit/:id" element={<AdminEdit />} />
        <Route path="/admin/logs" element={<AdminLogs />} />
        <Route path="/admin/logs/:id" element={<AdminLogs />} />
        <Route path="/dashboard" element={<DashBoard />} />
        {/* <Route path="/admin/student/:id" element={<StudentDetail />} /> */}
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
    </div>
  );
}

export default App;
