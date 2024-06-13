import SidebarWithHeader from "../components/SideBarWithHeader";
import { GetCourse } from "../services/Course";
import { ListCourses } from "../types/Course";

import CustomTable from "../components/CustomTable";
import React, { useEffect } from "react";

function ViewCourses() {
  const [courses, setCourses] = React.useState<ListCourses[]>([]);
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
      <CustomTable columns={columns} data={courses} />
    </SidebarWithHeader>
  );
}

export default ViewCourses;
