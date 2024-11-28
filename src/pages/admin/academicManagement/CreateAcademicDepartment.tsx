import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAllFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { academicDepartmentSchema } from "../../../schemas/academicDepartment.schema";
import { TResponse } from "../../../types";

// const facultyOptions = monthsName.map((item) => ({
//   value: item,
//   label: item,
// }));

export default function CreateAcademicDepartment() {
  const { data } = useGetAllFacultyQuery(undefined) as TResponse;
  const [addAcademicDepartment] =
    useAddAcademicDepartmentMutation() as TResponse;
  console.log(data?.data);
  const facultyOptions = data?.data.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating..");

    const academicDepartmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };
    try {
      console.log(academicDepartmentData);

      const res = (await addAcademicDepartment(
        academicDepartmentData
      )) as TResponse;
      // console.log(res);
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Academic Department Created Successfuly.", {
          id: toastId,
        });
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <PHInput label="Name" name="name" type="text" />
          <PHSelect
            label="Academic Faculty"
            name={"academicFaculty"}
            options={facultyOptions}
          ></PHSelect>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
}
