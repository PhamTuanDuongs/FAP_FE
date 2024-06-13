export interface StudentsInCourse {
  id: number;
  roleNumber: string;
}

export interface Course {
  code: string;
  subjectId: number;
  startDate: string;
  endDate: string;
  instructorId: number;
  timeSlot: string;
  room: string;
  students: Array<StudentsInCourse>;
}

export interface ListCourses {
  id: number;
  code: string;
  instructor: string;
  startDate: string;
  endDate: string;
  subject: string;
  room: string;
  manageSlot: number;
}
