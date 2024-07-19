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
    <SidebarWithHeader role2="admin">
      <CustomTable columns={columns} data={courses} />
    </SidebarWithHeader>
  );
}

export default ViewCourses;
