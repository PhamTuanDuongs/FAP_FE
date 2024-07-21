import SidebarWithHeader from "../components/SideBarWithHeader";
import { GetCourse } from "../services/Course";
import { Course } from "../types/Course";

import CustomTable from "../components/CustomTable";
import React, { useEffect } from "react";
import {
  Box,
  Table,
  TableCaption,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

function ViewCourses() {
  const [courses, setCourses] = React.useState<Course[]>([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await GetCourse();
      setCourses(response);
    };

    fetchCourses();
  }, []);
  const columns: string[] = React.useMemo(
    () => [
      "code",
      "subject",
      "instructor",
      "startDate",
      "endDate",
      "room",
      "manageSlot",
    ],
    []
  );
  return (
    <SidebarWithHeader role2="admin">
      {courses.length === 0 ? (
        <Table variant="simple">
          <TableCaption>No data</TableCaption>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>CODE</Th>
              <Th>SUBJECT</Th>
              <Th>INSTRUCTOR</Th>
              <Th>STARTDATE</Th>
              <Th>ENDDATE</Th>
              <Th>ROOM</Th>
              <Th>MANAGESLOT</Th>
            </Tr>
          </Thead>
        </Table>
      ) : (
        <CustomTable columns={columns} data={courses} />
      )}
    </SidebarWithHeader>
  );
}

export default ViewCourses;
