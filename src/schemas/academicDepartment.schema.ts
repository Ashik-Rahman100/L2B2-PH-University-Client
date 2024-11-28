import { z } from "zod";

export const academicDepartmentSchema = z.object({
  name: z.string({ required_error: "Please type a name" }),
  academicFaculty: z.string({ required_error: "Please Select a name" }),
});
