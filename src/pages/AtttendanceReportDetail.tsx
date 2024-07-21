import { useEffect, useState } from "react";
import SidebarWithHeader from "../components/SideBarWithHeader";
import { useParams } from "react-router-dom";
import {
  GetStatisticsToExcel,
  GetTakeAttendanceReportByCourseandInsId,
} from "../services/Course";
import { AttendanceCourse, AttendanceReport } from "../types/Course";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { GetDatesByCourseInstructor } from "../services/Schedule";
import { Date } from "../types/date";
import TokenStorageService from "../services/TokenStorage";

function AttendaceReportDetail() {
  const [courses, setCourse] = useState<AttendanceReport[]>([]);
  const [dates, setDates] = useState<Date[]>([]);

  let params = useParams();
  function getStatus(status: number): string {
    if (status === 0) {
      return "-";
    } else if (status === 1) {
      return "Present";
    } else {
      return "Absent";
    }
  }
  useEffect(() => {
    const tokenStorageService = new TokenStorageService();
    const user = tokenStorageService.getUser();

    const fetchCourse = async (id: any) => {
      const response = await GetTakeAttendanceReportByCourseandInsId(
        id,
        user.id
      );
      setCourse(response);
    };
    const fetchDates = async (id: any) => {
      const responsedate = await GetDatesByCourseInstructor(id, user.id);
      setDates(responsedate);
    };
    fetchDates(params.id);
    fetchCourse(params.id);
  }, []);

  const ExportFileExcel = () => {
    const tokenStorageService = new TokenStorageService();
    const user = tokenStorageService.getUser();

    console.log(params.id);
    console.log(user.id);

    if (params.id && user.id) {
      GetStatisticsToExcel(parseInt(params.id), user.id);
    }
  };

  return (
    <SidebarWithHeader role2="instructor">
      <Button onClick={() => ExportFileExcel()}>ExportFileExcel</Button>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>RollNumber</Th>
              <Th>FullName</Th>
              <Th>Course</Th>
              {dates.map((date: Date) => (
                <Th>{date.date}</Th>
              ))}
              <Th>Number of absents</Th>
              <Th>Percentage absent</Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses.map((course: AttendanceReport, index: number) => (
              <Tr>
                <Td>{index + 1}</Td>
                <Td>{course.rollNumber}</Td>
                <Td>{course.studentName}</Td>
                <Td>{course.courseName}</Td>
                {course.attendances.map((attendance: AttendanceCourse) => (
                  <Td>{getStatus(attendance.status)} </Td>
                ))}
                <Td>{course.summary}</Td>
                <Td>{course.percentage}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </SidebarWithHeader>
  );
}

export default AttendaceReportDetail;
