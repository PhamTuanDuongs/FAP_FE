import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TimetableComponentForStudent from "./pages/TimeTableForStudent";
import TakeAttendance from "./pages/TakeAttandance";
import TimetableComponentForTeacher from "./pages/TimeTableForTeacher";
import Login from "./pages/Login";
import AddNewCourse from "./pages/AddNewCourse";
import AttendaceReport from "./pages/AttendanceReport";
import ViewCourses from "./pages/ViewCourse";
import SubjectList from "./pages/SubjectList";
import AddNewSubject from "./pages/AddNewSubject";
import IsLogin from "./components/ProtectedLogin";
import UpdateSubject from "./pages/UpdateSubject";
import IsAuthorized from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import ViewStudent from "./pages/ViewStudent";
import AddNewStudent from "./pages/AddNewStudent";
import UpdateStudent from "./pages/UpdateStudent";
import ViewInstructor from "./pages/ViewInstructor";
import AddNewInstructor from "./pages/AddNewInstructor";
import UpdateInstructor from "./pages/UpdateInstructor";
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

          <Route element={<IsLogin />}>
            <Route element={<IsAuthorized role="Student" />}>
            </Route>

            <Route element={<IsAuthorized role="Admin" />}>
            <Route path="/Subjects" element={<SubjectList />} />
              <Route path="/Update/Subject/:id" element={<UpdateSubject />} />
            </Route>

          </Route>

          <Route path="/Add/Subject" element={<AddNewSubject />} />
          <Route path="/Courses" element={<ViewCourses />} />
          <Route path="/Students" element={<ViewStudent />} />
          <Route path="/Instructors" element={<ViewInstructor />} />
          <Route path="Add/Instructor" element={<AddNewInstructor />} />
          <Route path="/Add/Student" element={<AddNewStudent />} />
          <Route path="/Update/Student/:id" element={<UpdateStudent />} />
          <Route path="/Update/Instructor/:id" element={<UpdateInstructor />} />
          <Route path="/Unauthorized" element={<Unauthorized />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
