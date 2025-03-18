import { Bounce, toast, ToastPosition } from "react-toastify";

const showSuccessToast = (
  message?: string,
  position?: ToastPosition | undefined
) =>
  toast.success(message!, {
    position: position ? position : "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    style: styles
  });

const showErrorToast = (
  message?: string,
  position?: ToastPosition | undefined
) =>
  toast.error(message!, {
    position: position ? position : "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    style: styles,
  });

const showToast = (message?: string, position?: ToastPosition | undefined) =>
  toast(message!, {
    position: position ? position : "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    style: styles,
  });

const styles = { fontFamily: "Plus Jakarta Sans", fontSize: "13px" };
export { showToast, showSuccessToast, showErrorToast };
