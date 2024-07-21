import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetStudentAttendanceDetailsAPI } from "../services/Attendance";
import { StudentAttendanceDetailResponse } from "../types/Attandance";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Alert,
  AlertIcon,
  Box,
  Heading,
  Text,
  Divider,
  Select,
  HStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import SidebarWithHeader from "../components/SideBarWithHeader";
import { Slot } from "../utils/functions/slots";
import TokenStorageService from "../services/TokenStorage";

// Define slot time ranges
const slots: Slot[] = [
  { id: 1, time: "07:30-09:50" },
  { id: 2, time: "10:00-12:50" },
  { id: 3, time: "12:50-15:10" },
  { id: 4, time: "15:20-17:40" },
];

const slotTimes: Record<number, string> = slots.reduce((acc, slot) => {
  acc[slot.id] = slot.time;
  return acc;
}, {} as Record<number, string>);

// Utility function to get the day of the week
const getDayOfWeek = (dateString: string): string => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dateParts = dateString.split("/");
  const date = new Date(`${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`);
  return isNaN(date.getTime()) ? "" : daysOfWeek[date.getDay()];
};

// Utility function to format date
const formatDate = (dateString: string): string => {
  const dateParts = dateString.split("/");
  const day = dateParts[0].padStart(2, "0");
  const month = dateParts[1].padStart(2, "0");
  const year = dateParts[2];
  return `${day}/${month}/${year}`;
};

// Utility function to format the full date with day of the week
const formatFullDate = (dateString: string): string => {
  const dayOfWeek = getDayOfWeek(dateString);
  const formattedDate = formatDate(dateString);
  return dayOfWeek && formattedDate ? `${dayOfWeek} ${formattedDate}` : "";
};

const StudentAttendanceDetails: React.FC = () => {
  const [attendanceDetails, setAttendanceDetails] = useState<
    StudentAttendanceDetailResponse[]
  >([]);
  const [filteredDetails, setFilteredDetails] = useState<
    StudentAttendanceDetailResponse[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [groupFilter, setGroupFilter] = useState<string>("");
  const [groups, setGroups] = useState<string[]>([]);
  var token = new TokenStorageService();
  useEffect(() => {
    if (token.getUser().id) {
      const fetchAttendanceDetails = async () => {
        try {
          const data = await GetStudentAttendanceDetailsAPI(
            parseInt(token.getUser().id)
          );
          setAttendanceDetails(data);

          const uniqueGroups = Array.from(
            new Set(data.map((detail) => detail.courseName))
          ).sort();
          setGroups(uniqueGroups);

          if (uniqueGroups.length > 0) {
            setGroupFilter(uniqueGroups[0]);
          }
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Unknown error occurred";
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      };

      fetchAttendanceDetails();
    }
  }, []);

  useEffect(() => {
    const filtered = attendanceDetails.filter(
      (detail) => groupFilter === "" || detail.courseName === groupFilter
    );

    const sortedFilteredDetails = filtered.sort((a, b) => {
      const dateA = new Date(
        `${a.dateAttended?.split("/").reverse().join("-")}T00:00:00`
      );
      const dateB = new Date(
        `${b.dateAttended?.split("/").reverse().join("-")}T00:00:00`
      );
      return dateA.getTime() - dateB.getTime();
    });
    setFilteredDetails(sortedFilteredDetails);
  }, [groupFilter, attendanceDetails]);

  if (loading)
    return (
      <Box p={5}>
        <Text>Loading...</Text>
      </Box>
    );
  if (error)
    return (
      <SidebarWithHeader role2="student">
        <Box p={5}>
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        </Box>
      </SidebarWithHeader>
    );

  return (
    <SidebarWithHeader role2="student">
      <Box p={5}>
        <Heading mb={4}>Student Attendance Details</Heading>
        <Divider mb={4} />

        {/* Filters Section */}
        <Box mb={4}>
          <HStack spacing={4} mb={4}>
            <FormControl width="200px">
              <FormLabel htmlFor="group">Course</FormLabel>
              <Select
                id="group"
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
              >
                {groups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </Select>
            </FormControl>
          </HStack>
        </Box>

        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Date</Th>
                <Th>Slot</Th>
                <Th>Room</Th>
                <Th>Lecturer</Th>
                <Th>Course</Th>
                <Th>Attendance Status</Th>
                <Th>Lecturer's Comment</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredDetails.map((detail, index) => (
                <Tr key={detail.scheduleId}>
                  <Td>{index + 1}</Td>
                  <Td>{formatFullDate(detail.dateAttended || "Not Yet")}</Td>
                  <Td>{`${detail.slot}-(${slotTimes[detail.slot] || ""})`}</Td>
                  <Td>{detail.roomName}</Td>
                  <Td>{detail.instructorName}</Td>
                  <Td>{detail.courseName}</Td>
                  <Td
                    color={
                      detail.status === "1"
                        ? "green.500"
                        : detail.status === "2"
                        ? "red.500"
                        : "gray.500"
                    }
                  >
                    {detail.status === "1"
                      ? "Present"
                      : detail.status === "2"
                      ? "Absent"
                      : "Not Yet"}
                  </Td>
                  <Td>{detail.comment || "-"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </SidebarWithHeader>
  );
};

export default StudentAttendanceDetails;
