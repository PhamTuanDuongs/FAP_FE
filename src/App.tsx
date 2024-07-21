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
import AttendaceReportDetail from "./pages/AtttendanceReportDetail";
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
import AttendanceList from "./pages/AttendanceList";
import UpdateAttendance from "./pages/UpdateAttendance";
import StudentAttendanceDetails from "./pages/StudentAttendanceDetails";
import InstructorSchedule from "./pages/InstructorSchedule";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<IsLogin />}>
          
            <Route element={<IsAuthorized role="Student" />}>
              <Route
                path="/Student/Report/ScheduleOfWeek"
                element={<TimetableComponentForStudent />}
              />
              <Route
                path="/Student/details"
                element={<StudentAttendanceDetails />}
              />
            </Route>

            <Route element={<IsAuthorized role="Admin" />}>
              <Route path="/Subjects" element={<SubjectList />} />
              <Route path="/Update/Subject/:id" element={<UpdateSubject />} />
              <Route path="/Add/Subject" element={<AddNewSubject />} />
              <Route path="/Courses" element={<ViewCourses />} />
              <Route path="/Students" element={<ViewStudent />} />
              <Route path="/Instructors" element={<ViewInstructor />} />
              <Route path="Add/Instructor" element={<AddNewInstructor />} />
              <Route path="/Add/Student" element={<AddNewStudent />} />
              <Route path="/Update/Student/:id" element={<UpdateStudent />} />
              <Route
                path="/Update/Instructor/:id"
                element={<UpdateInstructor />}
              />
              <Route path="/Add/Course" element={<AddNewCourse />} />
            </Route>

            <Route element={<IsAuthorized role="Teacher" />}>
              <Route
                path="/Teacher/Report/ScheduleOfWeek"
                element={<TimetableComponentForTeacher />}
              />
              <Route path="/takeAttendance" element={<InstructorSchedule />} />

              <Route
                path="/AttendanceList/:scheduleId"
                element={<AttendanceList />}
              />
              <Route
                path="/UpdateAttendance/:userId/:scheduleId"
                element={<UpdateAttendance />}
              />
              <Route path="/Course/:id" element={<AttendaceReportDetail />} />

              <Route path="/Courses" element={<ViewCourses />} />
              <Route
                path="/Student/Report/Attendance"
                element={<AttendaceReport />}
              />
            </Route>
            
          </Route>

          <Route path=""  element={<Login />} />
          <Route path="/Unauthorized" element={<Unauthorized />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
