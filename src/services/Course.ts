import { Course } from "../types/Course";
import { PREFIX_URL } from "./api";

export async function AddNewCourseAPI(course: Course) {
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
