import { Button, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import SidebarWithHeader from "../components/SideBarWithHeader";
import React, { useEffect, useState } from "react";
import { Subject } from "../types/Subject";
import { DeleteSubjectAPI, GetAllSubjects } from "../services/Subject";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TokenStorageService from "../services/TokenStorage";

interface SubjectLine {
  data: Subject;
}

function SubjectList() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await GetAllSubjects();
      setSubjects(response);
      setIsLoaded(true);
    };

      fetchSubjects();
  }, [isLoaded]);

  const NewSubjectLine: React.FC<SubjectLine> = ({ data }) => {
    return (
      <Tr>
        <Td>{data.id}</Td>
        <Td>{data.code}</Td>
        <Td>{data.name}</Td>
        <Td>{data.manageSlot}</Td>
        <Td>
          <Button onClick={() => {
            navigate(`/Update/Subject/${data.id}`);
          }}>
            Update
          </Button>
          <Button onClick={() => handleDelete(data)}>Delete</Button>
        </Td>
      </Tr>
    );
  };

  const handleDelete = (subject: Subject) => {
    console.log(`Deleting subject:`, subject);

    const response = DeleteSubjectAPI(subject.id);
    response.then((res) => {
      if (res?.statusCode === 200) {
        toast.success(res.data, {
          position: "bottom-right",
        });

        setIsLoaded(false);
      } else {
        toast.error(res.data, {
          position: "bottom-right",
        });
      }
    });
  };

  return (
    <SidebarWithHeader role2="admin">
      <Text>Subject List</Text>
      <Button margin={1} >
        <Link to="/Add/Subject">Create Subject</Link>
      </Button>
      <Button onClick={() => window.location.reload()}>Refresh</Button>

      <TableContainer marginTop={5}>
        <Table>
          <Thead>
            <Tr>
              <Th>SubjectId</Th>
              <Th>CodeName</Th>
              <Th>SubjectName</Th>
              <Th>ManageSlots</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              subjects.length > 0 ? (
                <>
                  {subjects.map((subject) => <NewSubjectLine key={subject.id} data={subject}></NewSubjectLine>)}
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

export default SubjectList;