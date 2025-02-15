import { motion } from "framer-motion";
import { useAlert } from "../hooks/useAlert";

const AlertItem = () => {
  const { alertItem, message, setAlertItem } = useAlert();

  console.log(alertItem);
  

  if (!alertItem) return null; 

  setTimeout(() => {
    setAlertItem(false)
  }, 2000);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed z-50 xl:top-10 xl:left-[80%] top-[92%] left-5 flex items-center bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg"
    >
      ✅ {message}
    </motion.div>
  );
};

export default AlertItem;
