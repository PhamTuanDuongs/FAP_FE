export interface Subject {
  id: number;
  code: string;
  name: string;
  manageSlot: number;
}

export interface CourseDTO {
  id: number;
  code: string;
  subjectId: number;
  startDate: string;
  endDate: string;
  subject: Subject;
}
export interface Schedule {
  id: number;
  instructorCode: string;
  courseId: number;
  slot: number;
  date: string;
  room: string;
  status: boolean;
  course: CourseDTO;
}

export interface Attendance {
  studentId: number;
  scheduleId: number;
  dateAttended: string;
  status: number;
  comment?: string;
  scheduleDTONav: Schedule;
  studentdtoNav: Student;
}
export interface Metadata {
  metaDataId: number;
  name: string;
  address: string;
  dob: string;
  email: string;
  image?: string;
}

export interface Student {
  id: number;
  roleNumber: string;
  metaDatadtoNav: Metadata;
  MetaDataId: number;
  Attendancedto: Attendance;
}
export interface AttendanceResponse {
  studentId: number;
  scheduleId: number;
  studentName: string;
  roleNumber: string;
  dateAttended: string;
  status: number;
  comment: string;
  scheduleDTONav?: Schedule;
  studentdtoNav?: Student;
}


export interface AttendanceRequest {
  studentId: number;
  scheduleId: number;
  studentName: string;
  roleNumber: string;
  dateAttended: string;
  status: number;
  comment: string;
  scheduleDTONav?: Schedule;
  studentdtoNav?: Student;


}
export interface StudentAttendanceDetailResponse {
  studentId: number;
  studentName: string;
  roleNumber: string;
  scheduleId: number;
  dateAttended: string | null;
  status: string;
  comment: string | null;
  courseName: string;
  subjectName: string;
  courseCode: string;
  roomName: string;
  timeSlot: string;
  slot: number;
  instructorName: string;
  scheduleDTONav?: Schedule;
}
export interface ScheduleDetailsDTO {
  id: number;
  date: string;
  slot: number;
  courseCode: string;
  courseName: string;
  roomName: string;
  instructorName: string;
  timeSlot: string;
  status: boolean;
}