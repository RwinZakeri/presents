import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toastify = (status, text) => {
  toast[`${status}`](text);
};

export { Toastify };
