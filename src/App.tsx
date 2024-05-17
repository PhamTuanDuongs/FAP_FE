import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TimetableComponentForStudent from "./pages/TimeTableForStudent";
import TakeAttendance from "./pages/TakeAttandance";
import TimetableComponentForTeacher from "./pages/TimeTableForTeacher";
import SidebarWithHeader from "./components/SideBarWithHeader";
import { Text } from "@chakra-ui/react";
import AttendaceReport from "./pages/AttendanceReport";
import Login from "./pages/Login";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route
            path="/Student/Report/ScheduleOfWeek"
            element={<TimetableComponentForStudent />}
          />
          <Route
            path="/Teacher/Report/ScheduleOfWeek"
            element={<TimetableComponentForTeacher />}
          />
          <Route path="/takeAttendance" element={<TakeAttendance />} />
          <Route
            path="/Student/Report/Attendance"
            element={<AttendaceReport />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
