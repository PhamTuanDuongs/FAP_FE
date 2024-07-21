import { Button, Container, FormLabel, Input, Text } from "@chakra-ui/react";
import SidebarWithHeader from "../components/SideBarWithHeader";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NewStudent } from "../types/NewStudent";
import { GetStudentByIdAPI, GetStudentImageByUsernameAPI, UpdateStudentAPI } from "../services/Student";

function UpdateStudent() {
  const params = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState<NewStudent>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const validationSchema = yup.object({
    rolenumber: yup.string().required("Student rolenumber is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    name: yup.string().required("Student name is required"),
    address: yup.string().required("Student address is required"),
    dob: yup.string().required("Student date of birth is required"),
    email: yup.string().required("Email is required"),
    image: yup.string().required("Image is required"),
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
      image2: "",
      roleid: 1
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
        roleId: values.roleid
      }

      console.log(newSubjectData);

      const callUpdateStudentAPI = async (imageFile?: File | null) => {
        const response = await UpdateStudentAPI(Number(params.id), newSubjectData, imageFile);
        if (response.statusCode === 200) {
          toast.success(response.data, {
            position: "bottom-right",
          });
          navigate('/Students', { replace: true });
        } else {
          toast.error(response.data, {
            position: "bottom-right",
          });
        }
      };

      if (imageFile != null) {
        callUpdateStudentAPI(imageFile);
      } else {
        callUpdateStudentAPI();
      }

      setSubmitting(false);
    },
  });

  useEffect(() => {
    const fetchSubject = async () => {
      const response = await GetStudentByIdAPI(Number(params.id));
      console.log(response);
      setSubject(response);

      const response2 = await GetStudentImageByUsernameAPI(response.image);
      setImageUrl(URL.createObjectURL(response2));

      formik.setValues({
        rolenumber: response.roleNumber,
        username: response.username,
        password: response.password || '',
        name: response.name,
        address: response.address,
        dob: response.dob ? response.dob.slice(0, 10) : '',
        email: response.email,
        image: response.image,
        image2: "",
        roleid: response.roleid
      });
    };

    if (!subject) {
      fetchSubject();
    }
  }, [params.id, formik, formik.setValues, subject]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue('image2', file);
      setImageUrl(URL.createObjectURL(file));

      let type: string = "";
        let result: string =  formik.values.rolenumber + "." + file.type;
        let newResult: string = result.replace("image/jpeg", "");

        if(file.type === "image/jpg"){
          type = "jpg"
          newResult = result.replace("image/jpeg", "");
        }

        if(file.type === "image/jpeg"){
          type = "jpg"
          newResult = result.replace("image/jpeg", type);
        }

        if(file.type === "image/svg"){
          type = "svg"
          newResult = result.replace("image/svg", type);
        }

        if(file.type === "image/png"){
          type = "png";
          newResult = result.replace("image/png", type);
        }

      formik.setFieldValue('image', newResult);
      setImageFile(file);
    };
  };


  return (
    <SidebarWithHeader role2="admin">
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <FormLabel>Student ID</FormLabel>
          <Input readOnly defaultValue={params.id}></Input>
          <FormLabel>Student rolenumber</FormLabel>
          <Input
            name="rolenumber"
            id="rolenumber"
            value={formik.values.rolenumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.rolenumber && Boolean(formik.errors.rolenumber)}
            readOnly
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
          <FormLabel>Student Name</FormLabel>
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
            readOnly
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
            readOnly
          ></Input>
          {formik.errors.image && (
            <Text color="red">{formik.errors.image}</Text>
          )}

          <input
            name="image2"
            id="image2"
            type="file"
            onChange={handleImageChange}
            onBlur={formik.handleBlur}
          ></input>
          {imageUrl && (
            <img src={imageUrl} alt="" width="100px" />
          )}

          <Button marginTop="10px" type="submit">
            Update Student
          </Button>
        </form>
      </Container>
    </SidebarWithHeader>
  );
}

export default UpdateStudent;