import { Attendance, Schedule } from "../types/Attandance";
import { Course } from "../types/Course";

const PREFIX_URL = process.env.REACT_APP_SERVER_API + "/TimeTable";
export async function GetschedulesForStudent(
  id: number,
  from: string,
  to: string
) {
  try {
    const res = await fetch(
      `${PREFIX_URL + "/student/" + id + "?from=" + from + "&to=" + to}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Parse the JSON response
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function GetschedulesForInstructor(
  id: number,
  from: string,
  to: string
) {
  try {
    const res = await fetch(
      `${PREFIX_URL + "/instructor/" + id + "?from=" + from + "&to=" + to}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Parse the JSON response
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
