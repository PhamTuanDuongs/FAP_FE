import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
} from "@chakra-ui/react";
import { GetInstructorSchedulesAPI } from "../services/Attendance";
import { ScheduleDetailsDTO } from "../types/Attandance";
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

// Create a map for slot times
const slotTimes: Record<number, string> = slots.reduce((acc, slot) => {
  acc[slot.id] = slot.time;
  return acc;
}, {} as Record<number, string>);

const getSlotTime = (slotId: number): string => {
  return slotTimes[slotId] || "Unknown";
};

// Function to format the date as "weekday dd/MM/yyyy"
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options);
};

const InstructorSchedule: React.FC = () => {
  const { instructorId } = useParams<{ instructorId: string }>();
  const navigate = useNavigate();

  const [schedules, setSchedules] = useState<ScheduleDetailsDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = new TokenStorageService();
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await GetInstructorSchedulesAPI(token.getUser().id);
        const sortedData = data.sort((a, b) => {
          const dateComparison =
            new Date(a.date).getTime() - new Date(b.date).getTime();
          if (dateComparison !== 0) return dateComparison;

          if (a.slot !== b.slot) return a.slot - b.slot;

          return a.courseCode.localeCompare(b.courseCode);
        });

        setSchedules(sortedData);
      } catch (err) {
        console.error("Error fetching schedules:", err);
        setError("Failed to load schedule data");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const handleTakeAttendance = (scheduleId: number) => {
    navigate(`/AttendanceList/${scheduleId}`);
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <SidebarWithHeader role2="instructor">
      <Box p={5}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Take Attendance
        </Text>

        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Slot</Th>
              <Th>Time Slot</Th>
              <Th>Course Name</Th>
              <Th>Room</Th>
              <Th>Instructor</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {schedules.map((schedule) => (
              <Tr key={schedule.id}>
                <Td>{formatDate(schedule.date)}</Td>
                <Td>{schedule.slot}</Td>
                <Td>{getSlotTime(schedule.slot)}</Td>
                <Td>{schedule.courseCode}</Td>
                <Td>{schedule.roomName}</Td>
                <Td>{schedule.instructorName}</Td>
                <Td color={schedule.status ? "green.500" : "red.500"}>
                  {schedule.status ? "Attendance " : "Not Yet"}
                </Td>
                <Td>
                  {schedule.status ? (
                    <Button
                      mt={2}
                      colorScheme="blue"
                      onClick={() =>
                        navigate(
                          `/UpdateAttendance/${token.getUser().id}/${schedule.id}`
                        )
                      }
                    >
                      View Attendance
                    </Button>
                  ) : (
                    <Button
                      mt={2}
                      colorScheme="teal"
                      onClick={() => handleTakeAttendance(schedule.id)}
                    >
                      Take Attendance
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </SidebarWithHeader>
  );
};

export default InstructorSchedule;
