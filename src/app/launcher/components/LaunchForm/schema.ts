import * as yup from 'yup';

const messages = {
  required: 'Field is required',
  url: 'Enter correct URL',
  min: 'Minimum characters:',
  max: 'Maximum characters:'
};

export const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];
const MAX_FILE_SIZE = 250 * 1024;

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

export const TOTAL_SUPPLY: number = 1000000000;
const MAX_BUY_PERCENT: number = 50;

export const schema = yup
  .object({
    name: yup.string().required(messages.required).min(3, `${messages.min} 3`).max(15, `${messages.max} 15`),
    symbol: yup.string().required(messages.required).min(3, `${messages.min} 3`).max(15, `${messages.max} 15`),
    supply: yup.string().required(messages.required),
    websiteUrl: yup.string().url(messages.url).max(150, `${messages.max} 150`),
    socialUrl: yup.string().url(messages.url).max(150, `${messages.max} 150`),
    chatUrl: yup.string().url(messages.url).max(150, `${messages.max} 150`),
    description: yup.string().required(messages.required).min(15, `${messages.min} 15`).max(150, `${messages.max} 150`),
    buy: yup
      .string()
      .test('required', `Max ${MAX_BUY_PERCENT}%`, (value) => value !== undefined && value !== null && +value <= MAX_BUY_PERCENT),
    imageUrl: yup
      .mixed<FileList>()
      .required('Image is required')
      .test('required', 'Image is required', (value) => !!value?.[0])
      .test('fileSize', 'File size must be less 250KB', (value) => {
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
