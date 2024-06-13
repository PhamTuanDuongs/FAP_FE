import { PREFIX_URL } from "./api";

export async function GetAllInstructors() {
  try {
    console.log(PREFIX_URL);
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    const res = await fetch(`${PREFIX_URL + "/Instructor/GetAllInstructors"}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}
