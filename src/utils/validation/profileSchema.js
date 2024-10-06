import * as yup from "yup"

const profileSchema = yup.object({
  name: yup.string().trim().required().min(3).max(25),
  about: yup.string().optional(),
  age: yup.number().integer().min(0).optional(),
  address: yup.string().optional(),
});

export default profileSchema;
