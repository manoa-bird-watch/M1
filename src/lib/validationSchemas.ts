import * as Yup from 'yup';

export const AddSightingSchema = Yup.object({
  imagepath: Yup.string().url().required(),
  name: Yup.string().required(),
  sciname: Yup.string().required(),
  time: Yup.string().required(),
  userid: Yup.number().required(),
  description: Yup.string().required(),
  owner: Yup.string().required(),
});

export const EditSightingSchema = Yup.object({
  id: Yup.number().required(),
  imagepath: Yup.string().url().required(),
  name: Yup.string().required(),
  sciname: Yup.string().required(),
  time: Yup.string().required(),
  userid: Yup.number().required(),
  description: Yup.string().required(),
  owner: Yup.string().required(),
});
