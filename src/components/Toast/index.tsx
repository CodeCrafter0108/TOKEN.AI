import { Slide, ToastContainer } from 'react-toastify';

export const Toast = () => {
  return (
    <ToastContainer
      position='bottom-left'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
      transition={Slide}
    />
  );
};
