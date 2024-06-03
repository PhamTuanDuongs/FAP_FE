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
