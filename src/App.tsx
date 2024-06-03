import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TimetableComponentForStudent from "./pages/TimeTableForStudent";
import TakeAttendance from "./pages/TakeAttandance";
import TimetableComponentForTeacher from "./pages/TimeTableForTeacher";
import Login from "./pages/Login";
import AddNewCourse from "./pages/AddNewCourse";
import AttendaceReport from "./pages/AttendanceReport";
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
          <Route path="/Add/Course" element={<AddNewCourse />} />
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
