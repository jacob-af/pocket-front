import { Alert } from "@/types/util";
import { alertList } from "@/app/graphql/reactiveVar/alert";
import { useReactiveVar } from "@apollo/client";

export const AlertItem = ({
  alert,
  index
}: {
  alert: Alert;
  index: number;
}) => {
  const alerts = useReactiveVar(alertList);

  const color =
    alert.code === "success"
      ? "text-green-500"
      : alert.code === "error"
      ? "text-red-500"
      : "";

  const handleRemove = () => {
    // Remove the specific alert from the list by index
    const newAlerts = [...alerts];
    newAlerts.splice(index, 1);
    alertList(newAlerts);
  };

  return (
    <div
      className={`w-full justify-center truncate items-center bg-black h-10 ${color} mt-${
        20 + index * 11
      }`}
    >
      {alert.message}
      <button
        className="ml-2 bg-gray-500 text-white rounded p-1"
        onClick={handleRemove}
      >
        X
      </button>
    </div>
  );
};
