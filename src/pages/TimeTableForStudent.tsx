import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import SidebarWithHeader from "../components/SideBarWithHeader";
import { useEffect, useState } from "react";
import { Attendance } from "../types/Attandance";
import { GetschedulesForStudent } from "../services/Schedule";
import { Slot, slots } from "../utils/functions/slots";
import {
  getAllWeeks,
  getCurrentWeek,
  getCurrentWeekday,
  getCurrentYear,
  getDaysInWeek,
  yearArr,
} from "../utils/functions/dateUtils";
import { Day, Week } from "../types/date";

function TimetableComponentForStudent() {
  const [schedules, setSchedules] = useState<Attendance[]>([]);
  const [days, setDaysInAWeek] = useState<Day[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [weeksInYear, setWeeksInYear] = useState<Week[]>([]);
  const [currentWeek, setCurrentWeek] = useState<number>(getCurrentWeek());
  const [currentYear, setCurrentYear] = useState<number>(getCurrentYear());
  const [dateFrom, setDateFrom] = useState<string>(
    getCurrentWeekday("MMddYYY")[0].date
  );
  const [dateTo, setDateTo] = useState<string>(
    getCurrentWeekday("MMddYYY")[6].date
  );
  console.log(weeksInYear);
  const checkStatus = (status: number) => {
    if (status === 0) {
      return "NOTYET";
    } else if (status === 1) {
      return "ATTENDED";
    } else if (status === 2) {
      return "ABSENT";
    }
  };
  const handelGetDaysInAWeek = (value: string) => {
    if (value !== undefined || value != null) {
      const resultSplit = value.split(":");
      let currentWeek = parseInt(resultSplit[0]);
      let currentYear = parseInt(resultSplit[1]);
      if (currentYear !== 2024) {
        setDaysInAWeek(getDaysInWeek(currentWeek + 1, currentYear, "ddMM"));
        setDateFrom(
          getDaysInWeek(currentWeek + 1, currentYear, "MMddYYY")[0].date
        );
        setDateTo(
          getDaysInWeek(currentWeek + 1, currentYear, "MMddYYY")[6].date
        );
      } else {
        setDaysInAWeek(getDaysInWeek(currentWeek, currentYear, "ddMM"));
        setDateFrom(getDaysInWeek(currentWeek, currentYear, "MMddYYY")[0].date);
        setDateTo(getDaysInWeek(currentWeek, currentYear, "MMddYYY")[6].date);
      }
    }
  };

  const handleGetAllWeeksInYear = (year: number) => {
    setWeeksInYear(getAllWeeks(year));
    if (year !== getCurrentYear()) {
      setCurrentWeek(1);
      setCurrentYear(year);
      setDaysInAWeek(getDaysInWeek(2, year, "ddMM"));
      setDateFrom(getDaysInWeek(2, year, "MMddYYY")[0].date);
      setDateTo(getDaysInWeek(2, year, "MMddYYY")[6].date);
    } else {
      setDateFrom(getDaysInWeek(getCurrentWeek(), year, "MMddYYY")[0].date);
      setDateTo(getDaysInWeek(getCurrentWeek(), year, "MMddYYY")[6].date);
      setDaysInAWeek(getDaysInWeek(getCurrentWeek(), getCurrentYear(), "ddMM"));
      setCurrentWeek(getCurrentWeek());
      setCurrentYear(getCurrentYear());
    }
  };
  useEffect(() => {
    setDaysInAWeek(getCurrentWeekday("ddMM"));
    setWeeksInYear(getAllWeeks(getCurrentYear()));
    setYears(yearArr);
  }, []);

  useEffect(() => {
    const fetchSchedules = async () => {
      const response = await GetschedulesForStudent(1, dateFrom, dateTo);
      setSchedules(response);
    };

    fetchSchedules();
  }, [dateFrom, dateTo]);

  // response.then((res: Attendance[]) => setSchedules(res));
  return (
    <SidebarWithHeader>
      <h3>Schedule of Week</h3>
      <label htmlFor="year">Year</label>
      <select
        id="year"
        onChange={(e) => handleGetAllWeeksInYear(parseInt(e.target.value))}
      >
        {years.map((year: number) => (
          <option value={year} selected={year === currentYear}>
            {year}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="weeks">Week</label>
      <select id="weeks" onChange={(e) => handelGetDaysInAWeek(e.target.value)}>
        {weeksInYear.map((date: Week) => (
          <option
            key={date.weekNumber}
            value={date.weekNumber + ":" + date.year}
            selected={date.weekNumber === currentWeek}
          >
            {date.startDate}-{date.endDate}
          </option>
        ))}
      </select>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Slot</Th>
              {days.map((day: Day) => (
                <Th>
                  {day.day}-{day.date}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {slots.map((slot: Slot) => (
              <Tr>
                <Td>
                  Slot {slot.id}-{slot.time}
                </Td>
                {days.map((value) => (
                  <Td>
                    {schedules.map(
                      (schedule) =>
                        schedule.scheduleDTONav.slot === slot.id &&
                        schedule.scheduleDTONav.date === value.date && (
                          <div>
                            <div>{schedule.scheduleDTONav.instructorCode}</div>
                            <div>{schedule.scheduleDTONav.course.code}</div>
                            <div>at{schedule.scheduleDTONav.room}</div>
                            {checkStatus(schedule.status)}
                          </div>
                        )
                    )}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </SidebarWithHeader>
  );
}

export default TimetableComponentForStudent;
