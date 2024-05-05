"use client";

import { useEffect, useState } from "react";

import { Alert } from "@/types/util";
import { AlertItem } from "./AlertItem";
import { alertList } from "@/app/graphql/reactiveVar/alert";
import { useReactiveVar } from "@apollo/client";

export const AlertDisplay = () => {
  const alerts = useReactiveVar(alertList);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (alerts.length > 0) {
      const newTimer = setTimeout(() => {
        if (alerts.length > 0) {
          alertList(alerts.splice(0, 1));
        }
      }, 5000); // Adjust the delay time as needed, e.g., 5000ms for 5 seconds.

      setTimer(newTimer);
    }
  }, [alerts, timer]);

  return (
    <>
      {alerts.length === 0 ? (
        <></>
      ) : (
        <div className="fixed top-0 flex w-full justify-center">
          {alerts.map((alert: Alert, index: number) => (
            <AlertItem key={index} index={index} alert={alert} />
          ))}
        </div>
      )}
    </>
  );
};
