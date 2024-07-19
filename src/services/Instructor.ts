import { NewInstructor } from "../types/NewInstructor";
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

export async function AddNewInstructorAPI(subject: NewInstructor) {
  try {
    console.log(subject);

    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + "/Instructor/AddNewInstructor";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(subject),
    });

    const result = await res.text();

    return {
      data: result,
      statusCode: res.status
    }
  } catch (e) {
    throw e;
  }
}

export async function UpdateInstructorAPI(id: number, subject: NewInstructor) {
  try {
    console.log(subject);

    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + `/Instructor/UpdateInstructor/${id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(subject),
    });

    const result = await res.text();

    return {
      data: result,
      statusCode: res.status
    }
  } catch (e) {
    throw e;
  }
}

export async function DeleteInstructorAPI(id:number) {
  try {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + `/Instructor/DeleteInstructor/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
    });

    const result = await res.text();

    return {
      data: result,
      statusCode: res.status
    }
  } catch (e) {
    throw e;
  }
}

export async function GetInstructorByIdAPI(id:number) {
  try {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + `/Instructor/GetInstructorById/${id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
    });

    const result = await res.json();

    return result;
  } catch (e) {
    throw e;
  }
}