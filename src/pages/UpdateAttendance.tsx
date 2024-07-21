import React, { useState, useEffect } from "react";
import { Button, Table, Thead, Tbody, Tr, Th, Td, Box, Text, FormControl, FormLabel, Checkbox, Input, useToast } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { GetAttendancesByScheduleAPI, UpdateAttendancesAsync } from "../services/Attendance";
import { AttendanceResponse, AttendanceRequest } from "../types/Attandance";
import SidebarWithHeader from '../components/SideBarWithHeader';

const UpdateAttendance: React.FC = () => {
    const { instructorId, scheduleId } = useParams<{ instructorId: string; scheduleId: string }>();
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
    const toast = useToast(); // Sử dụng useToast để hiển thị thông báo
    const [students, setStudents] = useState<AttendanceResponse[]>([]);
    const [statusMap, setStatusMap] = useState<Map<number, number>>(new Map());
    const [commentMap, setCommentMap] = useState<Map<number, string>>(new Map());
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (scheduleId && instructorId) {
            const fetchStudents = async () => {
                try {
                    const result = await GetAttendancesByScheduleAPI(Number(scheduleId), Number(instructorId));
                    setStudents(result);
                    const initialStatusMap = new Map<number, number>();
                    const initialCommentMap = new Map<number, string>();

                    result.forEach(student => {
                        initialStatusMap.set(student.studentId, student.status || 0); // Mặc định là 0 (Not Yet)
                        initialCommentMap.set(student.studentId, student.comment || '');
                    });

                    setStatusMap(initialStatusMap);
                    setCommentMap(initialCommentMap);
                } catch (err) {
                    setError("Error fetching students.");
                }
            };

            fetchStudents();
        }
    }, [scheduleId, instructorId]);

    const handleStatusChange = (studentId: number, status: number) => {
        setStatusMap(prev => new Map(prev).set(studentId, status));
    };

    const handleCommentChange = (studentId: number, comment: string) => {
        setCommentMap(prev => new Map(prev).set(studentId, comment));
    };

    const handleSubmit = async () => {
        const attendanceRequests: AttendanceRequest[] = students.map(student => ({
            studentId: student.studentId,
            scheduleId: Number(scheduleId),
            studentName: student.studentName,
            roleNumber: student.roleNumber,
            dateAttended: new Date().toISOString(), // Hoặc lấy từ ngày điểm danh cụ thể
            status: statusMap.get(student.studentId) || 0,
            comment: commentMap.get(student.studentId) || '',
            scheduleDTONav: student.scheduleDTONav,
            studentdtoNav: student.studentdtoNav
        }));

        try {
            await UpdateAttendancesAsync(Number(instructorId), attendanceRequests);
            setSuccess("Attendance records updated successfully.");
            setError(null);
            toast({
                title: "Update Successful",
                description: "Attendance records have been updated successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            setError("Error updating attendance.");
            setSuccess(null);
            toast({
                title: "Update Failed",
                description: "There was an error updating the attendance records.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <SidebarWithHeader>
            <Box p={4}>
                <Text fontSize="2xl" mb={4}>Update Attendance</Text>
                {success && <Text color="green.500">{success}</Text>}
                {error && <Text color="red.500">{error}</Text>}

                <FormControl mb={4}>
                    <FormLabel>Student List</FormLabel>
                    {students.length > 0 ? (
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>No</Th>
                                    <Th>MSSV</Th>
                                    <Th>NAME</Th>
                                    <Th>STATUS</Th>
                                    <Th>COMMENT</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {students.map((student, index) => (
                                    <Tr key={student.studentId}>
                                        <Td>{index + 1}</Td>
                                        <Td>{student.roleNumber}</Td>
                                        <Td>{student.studentName}</Td>
                                        <Td>
                                            <FormControl display="flex" alignItems="center">
                                                <Checkbox
                                                    isChecked={statusMap.get(student.studentId) === 1}
                                                    onChange={() => handleStatusChange(student.studentId, 1)}
                                                >
                                                    Present
                                                </Checkbox>
                                                <Checkbox
                                                    ml={4}
                                                    isChecked={statusMap.get(student.studentId) === 2}
                                                    onChange={() => handleStatusChange(student.studentId, 2)}
                                                >
                                                    Absent
                                                </Checkbox>
                                            </FormControl>
                                        </Td>
                                        <Td>
                                            <Input
                                                value={commentMap.get(student.studentId) || ''}
                                                onChange={(e) => handleCommentChange(student.studentId, e.target.value)}
                                                placeholder="Add comment"
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    ) : (
                        <Text>No students available.</Text>
                    )}
                </FormControl>

                <Button
                    colorScheme="teal"
                    size="sm"
                    variant="solid"
                    onClick={handleSubmit}
                    disabled={students.length === 0}
                >
                    Submit
                </Button>
                <Button
                    colorScheme="gray"
                    size="sm"
                    ml={4}
                    onClick={() => navigate(`/Instructor/Schedule/${instructorId}`)}
                >
                    Back
                </Button>
            </Box>
        </SidebarWithHeader>
    );
};

export default UpdateAttendance;
