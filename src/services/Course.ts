import { number } from "yup";
import { CourseWithStudent } from "../types/Course";
import { PREFIX_URL } from "./api";

export async function AddNewCourseAPI(course: CourseWithStudent) {
  try {
    console.log(PREFIX_URL);
    const res = await fetch(`${PREFIX_URL + "/Course/Add/course"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });
    // Parse the JSON response
    const data = await res.json();
    return {
      message: data.message,
      statusCode: res.status,
    };
  } catch (err) {
    console.log(err);
  }
}

export async function GetCourse() {
  try {
    console.log(PREFIX_URL);
    const res = await fetch(`${PREFIX_URL + "/Course/GetCourses"}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function GetCourseByInstructorId(instructorId: number) {
  try {
    const res = await fetch(
      `${PREFIX_URL + "/Course/GetCourseInstructorId/" + instructorId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function GetTakeAttendanceReportByCourseandInsId(
  courseId: number,
  instructorId: number
) {
  try {
    const res = await fetch(
      `${
        PREFIX_URL +
        "/TimeTable/statistics?id=" +
        instructorId +
        "&courseId=" +
        courseId
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function GetStatisticsToExcel(
  courseId: number,
  instructorId: number
) {
  try {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + `/TimeTable/ExportStatisticToExcel?courseId=${courseId}&id=${instructorId}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        authorization: "Bearer " + token,
      },
    });

    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Statistic.xlsx";
    link.click();
  } catch (e) {
    throw e;
  }
}
