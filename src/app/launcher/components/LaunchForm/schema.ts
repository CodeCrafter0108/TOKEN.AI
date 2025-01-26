import * as yup from 'yup';

const messages = {
  required: 'Field is required',
  url: 'Enter correct URL',
  min: 'Minimum characters:',
  max: 'Maximum characters:'
};

export const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];
const MAX_FILE_SIZE = 200 * 1024; //TODO change

// const validateImageDimensions = (file: File): Promise<boolean> => {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     const image = new Image();

//     reader.onload = (e) => {
//       image.src = e.target?.result as string;

//       image.onload = () => {
//         const isValid = image.width === 200 && image.height === 200;
//         resolve(isValid);
//       };

//       image.onerror = () => resolve(false);
//     };

//     reader.onerror = () => resolve(false);

//     reader.readAsDataURL(file);
//   });
// };

export const schema = yup
  .object({
    name: yup.string().min(3, `${messages.min} 3`).max(24, `${messages.max} 24`).required(messages.required),
    symbol: yup.string().min(3, `${messages.min} 3`).max(24, `${messages.max} 24`).required(messages.required),
    supply: yup.string().required(messages.required),
    websiteUrl: yup.string().url(messages.url).required(messages.required),
    socialUrl: yup.string().url(messages.url).required(messages.required),
    chatUrl: yup.string().url(messages.url),
    description: yup.string().min(3, `${messages.min} 3`).max(128, `${messages.max} 128`).required(messages.required),
    imageUrl: yup
      .mixed<FileList>()
      .nullable()
      .required('Image is required')
      .test('required', 'Image is required', (value) => !!value?.[0])
      .test('fileSize', 'File size must be less 1MB', (value) => {
        return value && value?.[0]?.size <= MAX_FILE_SIZE;
      })

      .test('fileType', 'Supported types: .jpeg .jpg .png', (value) => {
        return value && SUPPORTED_FORMATS.includes(value?.[0]?.type);
      })
      // .test('dimensions', 'Image must be 200x200 pixels', async (value) => {
      //   if (!value || !value[0]) return false;
      //   return await validateImageDimensions(value[0]);
      // }),
  })
  .required();
