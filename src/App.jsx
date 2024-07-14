import { Route, Routes } from "react-router-dom";
import Form from "./components/form-component/Form";
import Admin from "./Admin/Admin";
import StudentDetail from "./components/module/student_module/StudentDetail";
function App() {
  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/student/:id" element={<StudentDetail />} />
      </Routes>
    </div>
  );
}

export default App;
