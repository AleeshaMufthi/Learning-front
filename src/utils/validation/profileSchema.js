import * as yup from "yup"

const URLRegex =
  /^(https?:\/\/(?:www\.)?github\.com\/[a-zA-Z0-9_-]+)|(https?:\/\/(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+)|[a-zA-Z0-9_-]+$/;

const profileSchema = yup.object({
  name: yup.string().trim().required().min(3).max(25),
  about: yup.string().optional(),
  age: yup.number().integer().min(0).optional(),
  address: yup.string().optional(),
});

export default profileSchema;
