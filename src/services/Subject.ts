import { Subject } from "../types/Subject";
import { PREFIX_URL } from "./api";

export async function GetAllSubjects() {
  try {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + "/Subject/GetAllSubjects";
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
    });

    const data = await res.json();
    return data;
  } catch (e) {
    throw e;
  }
}

export async function AddNewSubjectAPI(subject: Subject) {
  try {
    console.log(subject);

    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + "/Subject/AddNewSubject";
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

export async function UpdateSubjectAPI(id: number, subject: Subject) {
  try {
    console.log(subject);

    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + `/Subject/UpdateSubject/${id}`;
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

export async function DeleteSubjectAPI(id:number) {
  try {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + `/Subject/DeleteSubject/${id}`;
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

export async function GetSubjectByIdAPI(id:number) {
  try {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + `/Subject/GetSubjectById/${id}`;
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