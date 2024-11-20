import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constants/global";
import { nameOptions } from "../../../constants/semester";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { academicSemesterSchema } from "../../../schemas/academicSemester.shema";
import { TResponse } from "../../../types/global";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));
// console.log(yearOptions);

export default function CreateAcademicSemester() {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("creating..");
    const name = nameOptions[Number(data.name) - 1].label;
    const semesterData = {
      name: name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      // console.log(semesterData);

      const res = (await addAcademicSemester(semesterData)) as TResponse;
      // console.log(res);
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Semester Created Successfuly.", { id: toastId });
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
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect label="Name" name={"name"} options={nameOptions}></PHSelect>
          <PHSelect label="Year" name={"year"} options={yearOptions}></PHSelect>
          <PHSelect
            label="Start Month"
            name={"startMonth"}
            options={monthOptions}
          ></PHSelect>
          <PHSelect
            label="End Month"
            name={"endMonth"}
            options={monthOptions}
          ></PHSelect>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
}
