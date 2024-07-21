import { Button, Container, FormLabel, Input, Text } from "@chakra-ui/react";
import SidebarWithHeader from "../components/SideBarWithHeader";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { NewStudent } from "../types/NewStudent";
import { AddNewStudentAPI } from "../services/Student";
import { useState } from "react";

function AddNewStudent() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const validationSchema = yup.object({
    rolenumber: yup.string().required("Student rolenumber is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    name: yup.string().required("Student name is required"),
    address: yup.string().required("Student address is required"),
    dob: yup.string().required("Student date of birth is required"),
    email: yup.string().required("Email is required"),
    image: yup.string().required("Image is required"),
    roleid: yup.string().required("Role is required"),
    image2: yup
   .mixed()
   .required("File is required")
   .test("required", "Invalid file type. Only jpg,png", (value: any) => {
      if (!value ||!value.length) return true;
      const file = value[0];
      if (!file) return true;
      return ["image/jpeg", "image/jpg", "image/png"].includes(file.type);
    }),
  });

  const formik = useFormik({
    initialValues: {
      rolenumber: "",
      username: "",
      password: "",
      name: "",
      address: "",
      dob: "",
      email: "",
      image: "",
      image2: [],
      roleid: 1,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      let newSubjectData: NewStudent = {
        roleNumber: values.rolenumber,
        username: values.username,
        password: values.password,
        name: values.name,
        address: values.address,
        dob: values.dob,
        email: values.email,
        image: values.image,
        roleId: values.roleid,
      };

      let selectedFile = values.image2[0] as File;
      console.log(selectedFile);
      console.log(newSubjectData);

      if (imageFile != null) {
        const response = AddNewStudentAPI(newSubjectData, imageFile);
        response.then((res) => {
          if (res?.statusCode === 200) {
            toast.success(res.data, {
              position: "bottom-right",
            });

            navigate("/Students", { replace: true });
          } else {
            toast.error(res.data, {
              position: "bottom-right",
            });
          }
        });
      }

      setSubmitting(false);
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));

      console.log(formik.values.rolenumber);
      console.log(file.type);

      let type: string = "";
      let result: string = formik.values.rolenumber + "." + file.type;
      let newResult: string = result.replace("image/jpeg", "");

      if (file.type === "image/jpg") {
        type = "jpg";
        newResult = result.replace("image/jpeg", "");
      }

      if (file.type === "image/jpeg") {
        type = "jpg";
        newResult = result.replace("image/jpeg", type);
      }

      if (file.type === "image/svg") {
        type = "svg";
        newResult = result.replace("image/svg", type);
      }

      if (file.type === "image/png") {
        type = "png";
        newResult = result.replace("image/png", type);
      }

      formik.setFieldValue("image", newResult);
      formik.setFieldValue("image2", event.target.files);
      setImageFile(file);
    }
  };

  return (
    <SidebarWithHeader role2="admin">
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <FormLabel>Student Role Number</FormLabel>
          <Input
            name="rolenumber"
            id="rolenumber"
            value={formik.values.rolenumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.rolenumber && Boolean(formik.errors.rolenumber)
            }
          ></Input>
          {formik.errors.rolenumber && (
            <Text color="red">{formik.errors.rolenumber}</Text>
          )}
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.username && Boolean(formik.errors.username)
            }
          ></Input>
          {formik.errors.username && (
            <Text color="red">{formik.errors.username}</Text>
          )}
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.password && Boolean(formik.errors.password)
            }
          ></Input>
          {formik.errors.password && (
            <Text color="red">{formik.errors.password}</Text>
          )}
          <FormLabel>Student Name</FormLabel>
          <Input
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.name && Boolean(formik.errors.name)}
          ></Input>
          {formik.errors.name && <Text color="red">{formik.errors.name}</Text>}
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
          {formik.errors.dob && <Text color="red">{formik.errors.dob}</Text>}
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
            readOnly
          ></Input>

          <Input
            name="image2"
            id="image2"
            type="file"
            onChange={handleImageChange}
            onBlur={formik.handleBlur}
            required
          ></Input>
          {imageUrl && <img src={imageUrl} alt="" width="100px" />}
          {formik.errors.image2 && (
            <Text color="red">{formik.errors.image2}</Text>
          )}

          <FormLabel>Role</FormLabel>
          <Input value="Student" readOnly></Input>
          <Button marginTop="10px" type="submit">
            Add New Student
          </Button>
        </form>
      </Container>
    </SidebarWithHeader>
  );
}
export default AddNewStudent;
