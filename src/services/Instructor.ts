import { NewInstructor } from "../types/NewInstructor";
import { PREFIX_URL } from "./api";

export async function GetAllInstructors() {
  try {
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

export async function GetInstructorImageByUsernameAPI(username: string) {
  try {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + `/Instructor/GetInstructorImageByName/${username}`;
    
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
    });

    const blob = await res.blob();
    return blob;
    
  } catch (e) {
    throw e;
  }
}

export async function AddNewInstructorAPI(subject: NewInstructor , image?: File | null) {
  try {
    console.log(subject);
    console.log(image);

    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + "/Instructor/AddNewInstructor";

    const formData = new FormData();
    formData.append('file', image || '');
    formData.append('Name', subject.name || '');
    formData.append('Email', subject.email || '');
    formData.append('Address', subject.address || '');
    formData.append('Password', subject.password || '');
    formData.append('Username', subject.username || '');
    formData.append('InstructorCode', subject.instructorCode || '');
    formData.append('RoleId', subject.roleId.toString() || '');
    formData.append('Dob', subject.dob)
    formData.append('image', subject.image);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
      },
      body: formData
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

export async function UpdateInstructorAPI(id: number, subject: NewInstructor , image?: File | null) {
  try {
    console.log(subject);

    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + `/Instructor/UpdateInstructor/${id}`;

    const formData = new FormData();
    formData.append('file', image || '');
    formData.append('Name', subject.name || '');
    formData.append('Email', subject.email || '');
    formData.append('Address', subject.address || '');
    formData.append('Password', subject.password || '');
    formData.append('Username', subject.username || '');
    formData.append('InstructorCode', subject.instructorCode || '');
    formData.append('Dob', subject.dob)
    formData.append('image', subject.image);

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + token,
      },
      body: formData,
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