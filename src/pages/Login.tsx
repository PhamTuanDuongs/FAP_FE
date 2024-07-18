import { Box, Button, FormLabel,Heading, Input, Text, VStack } from "@chakra-ui/react";
import { LoginDTO } from "../types/Login";
import { useFormik } from "formik";
import * as yup from "yup";
import { LoginAPI } from "../services/Login";
import { toast } from "react-toastify";
import TokenStorageService from "../services/TokenStorage";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    username: yup.string().required("Email address is required"),
    password: yup.string().required("Password is required"),
  });


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      let loginData:LoginDTO = {
        username: values.username,
        password: values.password
      }
      const response = LoginAPI(loginData);
        response.then((res) => {
          if (res?.statusCode === 200) {
            toast.success("Login successful !", {
              position: "bottom-right",
            });

            const tokenStorageService = new TokenStorageService();

            tokenStorageService.signOut();
            console.log("token:"+res.token);
            tokenStorageService.saveToken(res.token);
            const retrievedUser = tokenStorageService.decodeToken(res.token);
            tokenStorageService.saveUser(retrievedUser);
            console.log(retrievedUser);

            if(retrievedUser.role === "Student"){
              navigate('/Subjects', { replace: true });
            }

            if(retrievedUser.role === "Teacher"){
              console.log(retrievedUser.role);
            }

            if(retrievedUser.role === "Admin"){
              console.log(retrievedUser.role);
            }

          } else {
            toast.error("Login failed !", {
              position: "bottom-right",
            });
            resetForm();
          }
        });
      
      setSubmitting(false);
    },
  });
  

  return (
    <Box w={['full' , 'md']} p={[8,10]} mt = {[20, '10vh']} mx='auto' border={['none', '1px']}
        borderColor={['', 'gray.300']} borderRadius={10}
    >
      <form onSubmit={formik.handleSubmit}>
      <VStack spacing={4} align= 'flex-start' w='full'>
        <VStack spacing={1} align={['flex-start', 'center']} w='full'>
          <Heading>FAP Login</Heading>
          <Text>Enter your email and password to login</Text>
        </VStack>

          <FormLabel htmlFor="username"> Email Address</FormLabel>
          <Input
            rounded='none'
            variant='filled'
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="username"
            id="username"
            isInvalid={formik.touched.username && Boolean(formik.errors.username)}
          />
          {formik.errors.username && (
            <Text color="red">{formik.errors.username}</Text>
          )}
          <FormLabel htmlFor="password"> Password</FormLabel>
          <Input rounded='none' variant='filled' type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            id="password"
            isInvalid={formik.touched.password && Boolean(formik.errors.password)}
          ></Input>
          {formik.errors.password && (
            <Text color="red">{formik.errors.password}</Text>
          )}

        <Button marginTop='10px' rounded='none' colorScheme='blue' w={['full']} alignSelf='end'
          type="submit"
          disabled={formik.isSubmitting}>Login</Button>
      </VStack>
      </form>
    </Box>
  );
}

export default Login;
