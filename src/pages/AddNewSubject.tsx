import { Button, Container, FormLabel, Input, Text } from "@chakra-ui/react";
import SidebarWithHeader from "../components/SideBarWithHeader";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Subject } from "../types/Subject";
import { AddNewSubjectAPI } from "../services/Subject";

function AddNewSubject() {
    const navigate = useNavigate();

    const validationSchema = yup.object({
        code: yup.string().required("Subject code is required"),
        name: yup.string().required("Subject name is required"),
        slots: yup.string().required("Number of Manage Slots is required")
    });

    const formik = useFormik({
        initialValues: {
            code: "",
            name: "",
            slots: 0
        },
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            let newSubjectData: Subject = {
                id: 0,
                code: values.code,
                name: values.name,
                manageSlot: values.slots
            }

            console.log(newSubjectData);

              const response = AddNewSubjectAPI(newSubjectData);
                response.then((res) => {
                  if (res?.statusCode === 200) {
                    toast.success(res.data, {
                      position: "bottom-right",
                    });

                    navigate('/Subjects', { replace: true });

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
        <SidebarWithHeader role2="admin">
            <Container>
                <form onSubmit={formik.handleSubmit}>
                    <FormLabel>Subject Code</FormLabel>
                    <Input name="code" id="code"
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.code && Boolean(formik.errors.code)}></Input>
                    {formik.errors.code && (
                        <Text color="red">{formik.errors.code}</Text>
                    )}
                    <FormLabel>Subject Name</FormLabel>
                    <Input name="name" id="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.name && Boolean(formik.errors.name)}></Input>
                    {formik.errors.name && (
                        <Text color="red">{formik.errors.name}</Text>
                    )}
                    <FormLabel>Number of Manage Slots</FormLabel>
                    <Input name="slots" id="slots" type="number"
                    value={formik.values.slots}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.slots && Boolean(formik.errors.slots)}></Input>
                    {formik.errors.slots && (
                        <Text color="red">{formik.errors.slots}</Text>
                    )}
                    <Button marginTop='10px' type="submit">Add New Subject</Button>
                </form>
            </Container>
        </SidebarWithHeader>
    );
}
export default AddNewSubject;