import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Container, Input, Select, Text } from "@chakra-ui/react";
import SidebarWithHeader from "../components/SideBarWithHeader";
import { AddNewCourseAPI } from "../services/Course";
import { Course } from "../types/Course";
import { toast } from "react-toastify";
import { formatDate } from "../utils/functions/dateUtils";
import {
  ConvertToStudentsInCourse,
  ReadFile,
} from "../utils/functions/csvUtils";
import { useState } from "react";
import { Timeslot } from "../types/TimeSlot";

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
  ];
  const [subjects, setSubjects] = useState<Timeslot[]>([]);
  const [room, setRoom] = useState<Timeslot[]>([]);
  const [instructor, setInstructor] = useState(null);
  let listSubjects = [
    { id: 1, name: "" },
    { id: 2, name: "" },
    { id: 3, name: "" },
  ];

  let listinstructor = [
    { Id: 1, name: "" },
    { id: 2, name: "" },
    { id: 3, name: "" },
  ];
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
      try {
        let selectedFile = values.file[0] as File;
        console.log("reading input file:");
        const jsonData = await ReadFile(selectedFile);
        const courseInStudents = ConvertToStudentsInCourse(jsonData);
        let course: Course = {
          code: values.name,
          subjectId: parseInt(values.subject),
          startDate: formatDate(values.startDate),
          endDate: formatDate(values.endDate),
          instructorId: parseInt(values.instructor),
          timeSlot: values.timeSlot,
          room: values.room,
          students: courseInStudents,
        };
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
            <option value={"1"}>PRN231</option>
            <option value={"2"}>PRN231</option>
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
            <option selected value={"1"}>
              Chilp
            </option>
            <option value={"2"}>Nhungnn</option>
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
            <option selected value={"1"}>
              BE123
            </option>
            <option value={"2"}>BE234</option>
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
