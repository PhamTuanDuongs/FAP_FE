import { Button, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import SidebarWithHeader from "../components/SideBarWithHeader";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Student } from "../types/Student";
import { DeleteStudentAPI, GetAllStudents, GetStudentInfoFile } from "../services/Student";

interface StudentLine {
  data: Student;
  index: number;
}

function ViewStudent() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await GetAllStudents();
      setStudents(response);
      setIsLoaded(true);
    };

    fetchStudents();
  }, [isLoaded]);

  const NewSubjectLine: React.FC<StudentLine> = ({ data , index }) => {
    return (
      <Tr>
        <Td>{index}</Td>
        <Td>{data.roleNumber}</Td>
        <Td>{data.name}</Td>
        <Td>{data.email}</Td>
        <Td>
          <Button marginRight={2} onClick={() => {
            navigate(`/Update/Student/${data.id}`);
          }}>
            Update
          </Button>
          <Button onClick={() => handleDelete(data)}>Delete</Button>
        </Td>
      </Tr>
    );
  };

  const handleDelete = (subject: Student) => {
    console.log(`Deleting student:`, subject);

    const response = DeleteStudentAPI(subject.id);
    response.then((res) => {
      if (res?.statusCode === 200) {
        toast.success(res.data, {
          position: "bottom-right",
        });
        setStudents(students.filter((student) => student.id !== subject.id));
      } else {
        toast.error(res.data, {
          position: "bottom-right",
        });
      }
    });

  };

  const ExportFileExcel = () => {
    console.log("file");
    GetStudentInfoFile();
  }

  return (
    <SidebarWithHeader role2="admin">
      <Text>Student List</Text>
      <Button marginRight={2} >
        <Link to="/Add/Student">Create Student</Link>
      </Button>
      <Button marginRight={2} onClick={() => window.location.reload()}>Refresh</Button>
      <Button onClick={() => ExportFileExcel()}>ExportFileExcel</Button>

      <TableContainer marginTop={5}>
        <Table>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>RoleNumber</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              students.length > 0 ? (
                <>
                  {students.map((subject,index) => <NewSubjectLine index={index + 1} key={subject.id} data={subject}></NewSubjectLine>)}
                </>
              ) : (
                <Tr>
                  <Td colSpan={5}>
                    <Text>Nothing to Show</Text>
                  </Td>
                </Tr>
              )
            }
          </Tbody>
        </Table>
      </TableContainer>
    </SidebarWithHeader>
  );
}

export default ViewStudent;