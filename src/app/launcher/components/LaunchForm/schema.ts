import * as yup from 'yup';

const messages = {
  required: 'Field is required',
  url: 'Enter correct URL',
  min: 'Minimum characters:',
  max: 'Maximum characters:'
};

export const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];
const MAX_FILE_SIZE = 200 * 1024;

export const schema = yup
  .object({
    name: yup.string().min(3, `${messages.min} 3`).max(32, `${messages.max} 32`).required(messages.required),
    symbol: yup.string().min(3, `${messages.min} 3`).max(32, `${messages.max} 32`).required(messages.required),
    supply: yup.string().required(messages.required),
    websiteUrl: yup.string().url(messages.url).required(messages.required),
    socialUrl: yup.string().url(messages.url).required(messages.required),
    chatUrl: yup.string().url(messages.url),
    description: yup.string().min(3, `${messages.min} 3`).max(128, `${messages.max} 128`).required(messages.required),
    imageUrl: yup
      .mixed<FileList>()
      .required()
      .test('required', 'Image is required', (value) => !!value?.[0])
      .test('fileSize', 'File size must be less 200KB', (value) => {
        return value && value?.[0]?.size <= MAX_FILE_SIZE;
      })

      .test('fileType', 'Supported types: .jpeg .jpg .png', (value) => {
        return value && SUPPORTED_FORMATS.includes(value?.[0]?.type);
      })
  })
  .required();
