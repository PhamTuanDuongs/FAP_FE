import {
  Box,
  Flex,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import SidebarWithHeader from "../components/SideBarWithHeader";
import { useEffect, useState } from "react";
import { Schedule } from "../types/Attandance";
import { GetschedulesForInstructor } from "../services/Schedule";
import { Slot, slots } from "../utils/functions/slots";
import {
  getAllWeeks,
  getCurrentDateFormatted,
  getCurrentWeek,
  getCurrentWeekday,
  getCurrentYear,
  getDaysInWeek,
  yearArr,
} from "../utils/functions/dateUtils";
import { Day, Week } from "../types/date";
import Dialog from "../components/Dialog";
import TokenStorageService from "../services/TokenStorage";

function TimetableComponentForTeacher() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [days, setDaysInAWeek] = useState<Day[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [weeksInYear, setWeeksInYear] = useState<Week[]>([]);
  const [currentWeek, setCurrentWeek] = useState<number>(getCurrentWeek());
  const [currentYear, setCurrentYear] = useState<number>(getCurrentYear());
  const [isOpen, setIsOpen] = useState(false);

  const [dateFrom, setDateFrom] = useState<string>(
    getCurrentWeekday("MMddYYY")[0].date
  );
  const [dateTo, setDateTo] = useState<string>(
    getCurrentWeekday("MMddYYY")[6].date
  );
  console.log(schedules);
  const checkStatus = (status: boolean) => {
    if (status) {
      return "ATTENDED";
    } else {
      return "NOTYet";
    }
  };
  const handelGetDaysInAWeek = (value: string) => {
    if (value !== undefined || value != null) {
      const resultSplit = value.split(":");
      let currentWeek = parseInt(resultSplit[0]);
      let currentYear = parseInt(resultSplit[1]);
      if (currentYear !== 2024) {
        setDaysInAWeek(getDaysInWeek(currentWeek, currentYear, "ddMM"));
        setDateFrom(getDaysInWeek(currentWeek, currentYear, "MMddYYY")[0].date);
        setDateTo(getDaysInWeek(currentWeek, currentYear, "MMddYYY")[6].date);
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
    setDaysInAWeek(getDaysInWeek(currentWeek - 1, currentYear, "ddMM"));
    setWeeksInYear(getAllWeeks(getCurrentYear()));
    setYears(yearArr);
  }, []);

  useEffect(() => {
    const tokenStorageService = new TokenStorageService();
    const user = tokenStorageService.getUser();
    const fetchSchedules = async () => {
      const response = await GetschedulesForInstructor(
        user.id,
        dateFrom,
        dateTo
      );
      setSchedules(response);
    };

    fetchSchedules();
  }, [dateFrom, dateTo]);

  // response.then((res: Attendance[]) => setSchedules(res));
  return (
    <SidebarWithHeader role2="instructor">
      <Box marginBottom="10">
        <Text fontSize="20" fontWeight="bold">
          Schedule of Week
        </Text>
      </Box>
      <Box>
        <Flex justifyContent="flex-start" gap="550">
          <Select
            width={150}
            name="year"
            aria-label="year"
            id="year"
            onChange={(e) => handleGetAllWeeksInYear(parseInt(e.target.value))}
          >
            {years.map((year: number) => (
              <option value={year} selected={year === currentYear}>
                Year - {year}
              </option>
            ))}
          </Select>
          <Select
            width={150}
            aria-label="weeks"
            id="weeks"
            onChange={(e) => handelGetDaysInAWeek(e.target.value)}
          >
            {weeksInYear.map((date: Week) => (
              <option
                key={date.weekNumber}
                value={date.weekNumber + ":" + date.year}
                selected={date.weekNumber === currentWeek - 1}
              >
                {date.startDate}-{date.endDate}
              </option>
            ))}
          </Select>
        </Flex>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontWeight="extrabold">Slot</Th>
                {days.map((day: Day) => (
                  <Th
                    fontWeight="extrabold"
                    color={
                      getCurrentDateFormatted() === day.date ? "red" : "black"
                    }
                  >
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
                          schedule.slot === slot.id &&
                          schedule.date === value.date && (
                            <div>
                              <div>{schedule.instructorCode}</div>
                              <div>{schedule.course.code}</div>
                              <div>at{schedule.room}</div>
                              <Text
                                color={
                                  schedule.status === true ? "blue" : "red"
                                }
                              >
                                {checkStatus(schedule.status)}
                              </Text>
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
      </Box>
    </SidebarWithHeader>
  );
}

export default TimetableComponentForTeacher;
