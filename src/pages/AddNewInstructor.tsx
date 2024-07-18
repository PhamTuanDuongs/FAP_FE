import { Button, Container, FormLabel, Input, Text } from "@chakra-ui/react";
import SidebarWithHeader from "../components/SideBarWithHeader";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { NewStudent } from "../types/NewStudent";
import { AddNewStudentAPI } from "../services/Student";
import { AddNewInstructorAPI } from "../services/Instructor";
import { NewInstructor } from "../types/NewInstructor";

function AddNewInstructor() {
    const navigate = useNavigate();

    const validationSchema = yup.object({
        instructorCode: yup.string().required("Instructor code is required"),
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required"),
        name: yup.string().required("Instructor name is required"),
        address: yup.string().required("Instructor address is required"),
        dob: yup.string().required("Instructor date of birth is required"),
        email: yup.string().required("Email is required"),
        image: yup.string().required("Image is required"),
        roleid: yup.string().required("Role is required")
    });

    const formik = useFormik({
        initialValues: {
            instructorCode: "",
            username: "",
            password: "",
            name: "",
            address: "",
            dob: "",
            email: "",
            image: "",
            roleid: 2
        },
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            let newSubjectData: NewInstructor = {
                instructorCode: values.instructorCode,
                username: values.username,
                password: values.password,
                name: values.name,
                address: values.address,
                dob: values.dob,
                email: values.email,
                image: values.image,
                roleId: values.roleid
            }

            console.log(newSubjectData);

              const response = AddNewInstructorAPI(newSubjectData);
                response.then((res) => {
                  if (res?.statusCode === 200) {
                    toast.success(res.data, {
                      position: "bottom-right",
                    });

                    navigate('/Instructors', { replace: true });

                  }else{
                    toast.error(res.data, {
                        position: "bottom-right",
                      });
                  }
                });

            setSubmitting(false);
        },
    });


    return (
        <SidebarWithHeader>
          <Container>
            <form onSubmit={formik.handleSubmit}>
              <FormLabel>Instructor Role Number</FormLabel>
              <Input
                name="instructorCode"
                id="instructorCode"
                value={formik.values.instructorCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.instructorCode && Boolean(formik.errors.instructorCode)}
              ></Input>
              {formik.errors.instructorCode && (
                <Text color="red">{formik.errors.instructorCode}</Text>
              )}
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                id="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.username && Boolean(formik.errors.username)}
              ></Input>
              {formik.errors.username && (
                <Text color="red">{formik.errors.username}</Text>
              )}
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && Boolean(formik.errors.password)}
              ></Input>
              {formik.errors.password && (
                <Text color="red">{formik.errors.password}</Text>
              )}
              <FormLabel>Instructor Name</FormLabel>
              <Input
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.name && Boolean(formik.errors.name)}
              ></Input>
              {formik.errors.name && (
                <Text color="red">{formik.errors.name}</Text>
              )}
              <FormLabel>Address</FormLabel>
              <Input
                name="address"
                id="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.address && Boolean(formik.errors.address)}
              ></Input>
              {formik.errors.address && (
                <Text color="red">{formik.errors.address}</Text>
              )}
              <FormLabel>Date of Birth</FormLabel>
              <Input
                name="dob"
                id="dob"
                type="date"
                value={formik.values.dob}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.dob && Boolean(formik.errors.dob)}
              ></Input>
              {formik.errors.dob && (
                <Text color="red">{formik.errors.dob}</Text>
              )}
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.email && Boolean(formik.errors.email)}
              ></Input>
              {formik.errors.email && (
                <Text color="red">{formik.errors.email}</Text>
              )}
              <FormLabel>Image</FormLabel>
              <Input
                name="image"
                id="image"
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.image && Boolean(formik.errors.image)}
              ></Input>
              {formik.errors.image && (
                <Text color="red">{formik.errors.image}</Text>
              )}
              <FormLabel>Role</FormLabel>
              <Input
                value="Instructor"
                readOnly
              ></Input>
              <Button marginTop='10px' type="submit">Add New Instructor</Button>
            </form>
          </Container>
        </SidebarWithHeader>
      );
}
export default AddNewInstructor;