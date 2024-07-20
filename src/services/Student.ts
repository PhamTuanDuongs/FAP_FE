import { NewStudent } from "../types/NewStudent";
import { PREFIX_URL } from "./api";

export async function GetAllStudents() {
  try {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + "/Student/GetAllStudents";
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

export async function GetStudentImageByUsernameAPI(username: string) {
  try {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + `/Student/GetStudentImageByName/${username}`;
    console.log(url);
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

export async function AddNewStudentAPI(subject: NewStudent, image?: File | null) {
  try {
    console.log(subject);
    console.log(image);

    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + "/Student/AddNewStudent";

    const formData = new FormData();
    formData.append('file', image || '');
    formData.append('Name', subject.name || '');
    formData.append('Email', subject.email || '');
    formData.append('Address', subject.address || '');
    formData.append('Password', subject.password || '');
    formData.append('Username', subject.username || '');
    formData.append('RoleNumber', subject.roleNumber || '');
    formData.append('RoleId', subject.roleId.toString() || '');
    formData.append('Dob', subject.dob)
    formData.append('image', subject.image);

    console.log(formData);

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

export async function UpdateStudentAPI(id: number, subject: NewStudent, image?: File | null) {
  try {
    console.log(subject);
    console.log(image);

    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + `/Student/UpdateStudent/${id}`;

    const formData = new FormData();
    formData.append('file', image || '');
    formData.append('Name', subject.name || '');
    formData.append('Email', subject.email || '');
    formData.append('Address', subject.address || '');
    formData.append('Password', subject.password || '');
    formData.append('Username', subject.username || '');
    formData.append('RoleNumber', subject.roleNumber || '');
    formData.append('Dob', subject.dob)
    formData.append('image', subject.image);

    const res = await fetch(url, {
      method: "PUT",
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

export async function DeleteStudentAPI(id: number) {
  try {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + `/Student/DeleteStudent/${id}`;
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

export async function GetStudentByIdAPI(id: number) {
  try {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + `/Student/GetStudentById/${id}`;
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

export async function GetStudentInfoFile() {
  try {
    var token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJUb2tlbklkIjoiNzJjMDY1YzEtYjkwYy00NGUyLTkyODctMzFmZGM3MjEzMzYxIiwiQWNjb3VudElkIjoiMSIsIlVzZXJuYW1lIjoiZHVvbmdwdDE4Iiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzE4MTU5ODQyLCJleHAiOjE3MTgxNzA2NDIsImlhdCI6MTcxODE1OTg0MiwiaXNzIjoiRlBUVW5pdmVyc2l0eSIsImF1ZCI6IkZBUFVzZXIifQ.KrfVoI8c01BQFrSGADaAr7XCK7fjKa3ZDvA_yrtXrXY";
    var url = PREFIX_URL + `/Student/ExportStudentToExcel`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        authorization: "Bearer " + token,
      },
    });

    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "StudentsInfo.xlsx";
    link.click();
  } catch (e) {
    throw e;
  }
}