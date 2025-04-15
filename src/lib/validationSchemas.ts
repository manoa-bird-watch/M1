import * as Yup from 'yup';

export const AddBirdSchema = Yup.object({
  imagepath: Yup.string().url().required(),
  name: Yup.string().required(),
  sciname: Yup.string().required(),
  time: Yup.string().required(),
  user: Yup.string().required(),
  description: Yup.string().required(),
  owner: Yup.string().required(),
});

export const EditBirdSchema = Yup.object({
  id: Yup.number().required(),
  imagepath: Yup.string().url().required(),
  name: Yup.string().required(),
  sciname: Yup.string().required(),
  time: Yup.string().required(),
  user: Yup.string().required(),
  description: Yup.string().required(),
  owner: Yup.string().required(),
});
