import SidebarWithHeader from "../components/SideBarWithHeader";
import { GetCourse } from "../services/Course";
import { Course } from "../types/Course";

import CustomTable from "../components/CustomTable";
import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

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
    <SidebarWithHeader>
      <Box marginBottom="10">
        <Text fontSize="20" fontWeight="bold">
          List of courses
        </Text>
      </Box>
      <CustomTable columns={columns} data={courses} />
    </SidebarWithHeader>
  );
}

export default ViewCourses;
