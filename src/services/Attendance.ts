import { Attendance, AttendanceRequest, AttendanceResponse, ScheduleDetailsDTO } from "../types/Attandance";
import { StudentAttendanceDetailResponse } from "../types/Attandance";
import { PREFIX_URL } from "./api";

// Lấy danh sách điểm danh theo scheduleId và instructorId
export async function GetAttendancesByScheduleAPI(scheduleId: number, instructorId: number): Promise<AttendanceResponse[]> {
  try {
    const res = await fetch(`${PREFIX_URL}/Attendances/${scheduleId}/${instructorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data as AttendanceResponse[];
  } catch (err) {
    console.error('Failed to fetch attendances:', err);
    throw err;
  }
}

// services/Attendance.ts
export async function GetStudentAttendanceDetailsAPI(studentId: number): Promise<StudentAttendanceDetailResponse[]> {
  try {
    const res = await fetch(`${PREFIX_URL}/Attendances/student/details/${studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data as StudentAttendanceDetailResponse[];
  } catch (err) {
    console.error('Failed to fetch student attendance details:', err);
    throw err;
  }
}

// Lấy danh sách lịch dạy của giáo viên
export async function GetInstructorSchedulesAPI(instructorId: number): Promise<ScheduleDetailsDTO[]> {
  try {
    const res = await fetch(`${PREFIX_URL}/Attendances/schedules/${instructorId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data as ScheduleDetailsDTO[];
  } catch (err) {
    console.error('Failed to fetch instructor schedules:', err);
    throw err;
  }
}

export async function UpdateAttendancesAsync(instructorId: number, attendanceRequests: AttendanceRequest[]): Promise<AttendanceResponse[]> {
  try {
    const res = await fetch(`${PREFIX_URL}/Attendances/${instructorId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendanceRequests),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data as AttendanceResponse[];
  } catch (err) {
    console.error('Failed to add or update attendance:', err);
    throw err;
  }
}
