import { Course } from "../types/Course";

const PREFIX_URL = process.env.REACT_APP_SERVER_API + "/Course";
export async function AddNewCourseAPI(course: Course) {
  try {
    console.log(PREFIX_URL);
    const res = await fetch(`${PREFIX_URL + "/Add/course"}`, {
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
    const res = await fetch(`${PREFIX_URL + "/get"}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json;
  } catch (err) {
    throw err;
  }
}
