export interface StudentsInCourse {
  id: number;
  roleNumber: string;
}

export interface CourseWithStudent {
  code: string;
  subjectId: number;
  startDate: string;
  endDate: string;
  instructorId: number;
  timeSlot: string;
  room: string;
  students: Array<StudentsInCourse>;
}

export interface Course {
  id: number;
  code: string;
  instructor: string;
  startDate: string;
  endDate: string;
  subject: string;
  room: string;
  manageSlot: number;
}

export interface AttendanceCourse {
  studentId: number;
  scheduleId: number;
  dateAttended: Date;
  status: number;
  comment: number;
}
export interface AttendanceReport {
  courseName: string;
  rollNumber: string;
  studentName: string;
  percentage: number;
  summary: number;
  attendances: AttendanceCourse[];
}
