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
import { Course } from "../types/Course";
import { GetCourseByInstructorId } from "../services/Course";
import { Link } from "react-router-dom";

function AttendaceReport() {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await GetCourseByInstructorId(1);
      setCourses(response);
    };

    fetchCourses();
  }, []);

  return (
    <SidebarWithHeader>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Name</Th>
              <Th>Instructor</Th>
              <Th>StartDate</Th>
              <Th>EndDate</Th>
              <Th>Subject</Th>
              <Th>Room</Th>
              <Th>ManageSlot</Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses.map((course: Course, index: number) => (
              <Tr>
                <Td>{index + 1}</Td>
                <Td>{course.code}</Td>
                <Td>{course.instructor}</Td>
                <Td>{course.startDate}</Td>
                <Td>{course.endDate}</Td>
                <Td>{course.subject}</Td>
                <Td>{course.room}</Td>
                <Td>{course.manageSlot}</Td>
                <Td>
                  <Link to={`/Course/${course.id}`}>View Detail</Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </SidebarWithHeader>
  );
}

export default AttendaceReport;
