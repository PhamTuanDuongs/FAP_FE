import { Button, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import SidebarWithHeader from "../components/SideBarWithHeader";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Instructor } from "../types/Instructor";
import { DeleteInstructorAPI, GetAllInstructors } from "../services/Instructor";
import { toast } from "react-toastify";

interface InstructorLine {
  data: Instructor;
}

function ViewInstructor() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Instructor[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await GetAllInstructors();
      setStudents(response);
      setIsLoaded(true);
    };

      fetchStudents();
  }, [isLoaded]);

  const NewSubjectLine: React.FC<InstructorLine> = ({ data }) => {
    return (
      <Tr>
        <Td>{data.id}</Td>
        <Td>{data.instructorCode}</Td>
        <Td>{data.name}</Td>
        <Td>{data.email}</Td>
        <Td>
          <Button marginRight={2} onClick={() => {
            navigate(`/Update/Instructor/${data.id}`);
          }}>
            Update
          </Button>
          <Button onClick={() => handleDelete(data)}>Delete</Button>
        </Td>
      </Tr>
    );
  };

  const handleDelete = (subject: Instructor) => {
    console.log(`Deleting instructor:`, subject);

    const response = DeleteInstructorAPI(subject.id);
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

  return (
    <SidebarWithHeader role2="admin">
      <Text>Instructor List</Text>
      <Button margin={1} >
        <Link to="/Add/Instructor">Create Instructor</Link>
      </Button>
      <Button onClick={() => window.location.reload()}>Refresh</Button>

      <TableContainer marginTop={5}>
        <Table>
          <Thead>
            <Tr>
              <Th>InstructorId</Th>
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
                  {students.map((subject) => <NewSubjectLine key={subject.id} data={subject}></NewSubjectLine>)}
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

export default ViewInstructor;