import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Button,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { GetAttendancesByScheduleAPI } from "../services/Attendance";
import { AttendanceResponse } from "../types/Attandance";
import SidebarWithHeader from "../components/SideBarWithHeader";

const AttendanceList: React.FC = () => {
  const { scheduleId, instructorId } = useParams<{
    scheduleId: string;
    instructorId: string;
  }>();
  const [data, setData] = useState<AttendanceResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const attendances: AttendanceResponse[] =
          await GetAttendancesByScheduleAPI(
            Number(scheduleId),
            Number(instructorId)
          );
        console.log("Fetched Attendances:", attendances);
        setData(attendances);
      } catch (err) {
        console.error("Error fetching attendances:", err);
        setError("Error fetching attendances.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendances();
  }, [scheduleId, instructorId]);

  if (loading) return <Spinner size="xl" />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );

  return (
    <SidebarWithHeader role2="instructor">
      <Box p={4}>
        <Text fontSize="2xl" mb={4}>
          Attendance List
        </Text>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Date Attended</Th>
              <Th>Student Name</Th>
              <Th>Role Number</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>
                  {item.dateAttended
                    ? format(parseISO(item.dateAttended), "eeee, dd/MM/yyyy")
                    : "N/A"}
                </Td>
                <Td>{item.studentName || "N/A"}</Td>
                <Td>{item.roleNumber || "N/A"}</Td>
                <Td color={item.status === 1 ? "green.500" : "red.500"}>
                  {item.status === 1 ? "Present" : "Absent"}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button
          colorScheme="blue"
          mt={4}
          onClick={() =>
            navigate(`/UpdateAttendance/${instructorId}/${scheduleId}`)
          }
        >
          Edit Attendance
        </Button>
      </Box>
    </SidebarWithHeader>
  );
};

export default AttendanceList;
