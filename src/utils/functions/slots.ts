import { Timeslot } from "../../types/TimeSlot";

export const timeslots: Timeslot[] = [
  { Id: "A24" },
  { Id: "A36" },
  { Id: "A42" },
  { Id: "A35" },
  { Id: "A25" },
  { Id: "A62" },
];

export interface Slot {
  id: number;
  time: string;
}
export const slots: Slot[] = [
  { id: 1, time: "07:30-9h50" },
  { id: 2, time: "10:00-12h50" },
  { id: 3, time: "12:50-15:10" },
  { id: 4, time: "15:20-17:40" },
];
