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
  dateAttended?: string;
  status: number;
  comment?: string;
  scheduleDTONav: Schedule;
}
