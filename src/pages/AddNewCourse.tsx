import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Container,
  Input,
  position,
  Select,
  Text,
} from "@chakra-ui/react";
import SidebarWithHeader from "../components/SideBarWithHeader";
import { AddNewCourseAPI } from "../services/Course";
import { Course } from "../types/Course";
import { toast } from "react-toastify";
import { formatDate } from "../utils/functions/dateUtils";
import {
  ConvertToStudentsInCourse,
  ReadFile,
} from "../utils/functions/csvUtils";
import { useEffect, useState } from "react";
import { Timeslot } from "../types/TimeSlot";
import { GetAllInstructors } from "../services/Instructor";
import { Instructor } from "../types/Instructor";
import { GetAllSubjects } from "../services/Subject";
import { Subject } from "../types/Attandance";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().required("End date is required"),
  subject: yup.string().required("Subject is required"),
  instructor: yup.string().required("Instructor is required"),
  timeSlot: yup.string().required("Time slot is required"),
  room: yup.string().required("Room is required"),
  file: yup
    .mixed()
    .required("File is required")
    .test("required", "File size is too large", (value: any) => {
      if (!value || !value.length) return true;
      const file = value[0];
      if (!file) return true;
      return file.size <= 1024 * 1024 && file.type === "text/csv";
    }),
});

function AddNewCourse() {
  const slots: Timeslot[] = [
    { Id: "A24" },
    { Id: "A36" },
    { Id: "A42" },
    { Id: "A35" },
    { Id: "A25" },
    { Id: "A62" },
    { Id: "A46" },
  ];
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [rooms, setRoom] = useState<Timeslot[]>([]);
  const [instructors, setInstructor] = useState<Instructor[]>([]);
  const formik = useFormik({
    initialValues: {
      name: "",
      startDate: "",
      endDate: "",
      subject: "",
      instructor: "",
      timeSlot: slots[0].Id,
      room: "",
      file: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      toast.success("s", {
        position: "bottom-left",
      });
      try {
        let selectedFile = values.file[0] as File;
        console.log("reading input file:");
        const jsonData = await ReadFile(selectedFile);
        const courseInStudents = ConvertToStudentsInCourse(jsonData);
        let course: Course = {
          code: values.name,
          subjectId: parseInt(values.subject),
          startDate: values.startDate,
          endDate: values.endDate,
          instructorId: parseInt(values.instructor),
          timeSlot: values.timeSlot,
          room: values.room,
          students: courseInStudents,
        };
        console.log(course);
        const response = AddNewCourseAPI(course);
        response.then((res) => {
          if (res?.statusCode === 200) {
            toast.success(res.message, {
              position: "bottom-right",
            });
          } else {
            toast.error(res?.message, {
              position: "bottom-right",
            });
          }
        });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
  });

  useEffect(() => {
    const fetchInstructors = async () => {
      const response = await GetAllInstructors();
      if (response.length > 0) {
        formik.setFieldValue("instructor", response[0].id);
      }
      setInstructor(response);
    };
    const fetchSubjects = async () => {
      const response = await GetAllSubjects();
      if (response.length > 0) {
        formik.setFieldValue("subject", response[0].id);
      }
      setSubjects(response);
    };
    fetchInstructors();
    fetchSubjects();
  }, []);

  return (
    <SidebarWithHeader>
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">
            Name
            <Text color="red" display="inline">
              *
            </Text>
          </label>
          <Input
            id="name"
            name="name"
            placeholder="PRN231-SE1711-NET"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.name && Boolean(formik.errors.name)}
          />
          <Box color="red">{formik.errors.name}</Box>
          <label htmlFor="startDate">
            StartDate
            <Text color="red" display="inline">
              *
            </Text>
          </label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.startDate && Boolean(formik.errors.startDate)
            }
          />
          <Box color="red">{formik.errors.startDate}</Box>
          <label htmlFor="endate">
            EndDate
            <Text color="red" display="inline">
              *
            </Text>
          </label>
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.endDate && Boolean(formik.errors.endDate)}
          />
          <Box color="red">{formik.errors.endDate}</Box>
          <label htmlFor="subject">
            Subject
            <Text color="red" display="inline">
              *
            </Text>
          </label>
          <Select
            id="subject"
            name="subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {subjects.map((subject) => (
              <option value={subject.id}>{subject.code}</option>
            ))}
          </Select>
          <label htmlFor="instructor">
            Instructor
            <Text color="red" display="inline">
              *
            </Text>
          </label>
          <Select
            id="instructor"
            name="instructor"
            value={formik.values.instructor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {instructors.map((instructor) => (
              <option selected value={instructor.id}>
                {instructor.instructorCode}
              </option>
            ))}
          </Select>
          <label htmlFor="timeSlot">
            TimeSlot
            <Text color="red" display="inline">
              *
            </Text>
          </label>
          <Select
            id="timeSlot"
            name="timeSlot"
            value={formik.values.timeSlot}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {slots.map((slot) => (
              <option selected value={slot.Id}>
                {slot.Id}
              </option>
            ))}
          </Select>
          <label htmlFor="room">
            Room
            <Text color="red" display="inline">
              *
            </Text>
          </label>
          <Select
            id="room"
            name="room"
            value={formik.values.room}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option selected value={"BE123"}>
              BE123
            </option>
            <option value={"BE124"}>BE234</option>
          </Select>
          <label htmlFor="file">
            Students
            <Text color="red" display="inline">
              *
            </Text>
          </label>
          <Input
            id="file"
            name="file"
            type="file"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              formik.setFieldValue("file", event.target.files);
            }}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.file && Boolean(formik.errors.file)}
          />
          <Box color="red">{formik.errors.file}</Box>
          <Button
            marginTop="2px"
            colorScheme="blue"
            variant="solid"
            type="submit"
          >
            Create
          </Button>
        </form>
      </Container>
    </SidebarWithHeader>
  );
}

export default AddNewCourse;
