import { Slide, toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide
};

export const successMsg = (message: string) => {
    toast.success(message, defaultOptions);
};

export const errorMsg = (message: string) => {
    toast.error(message, defaultOptions);
};

export const infoMsg = (message: string) => {
    toast.info(message, defaultOptions);
};

export const warningMsg = (message: string) => {
    toast.warning(message, defaultOptions);
};

export const swrMsg = () => {
    toast('Something went wrong! Please try again later.', defaultOptions);
};
