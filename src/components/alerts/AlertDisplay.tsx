"use client";

import { useEffect, useState } from "react";

import { Alert } from "@/types/util";
import { AlertItem } from "./AlertItem";
import { alertList } from "@/graphql/reactiveVar/alert";
import { useReactiveVar } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

export const AlertDisplay = () => {
  const alerts = useReactiveVar(alertList);

  useEffect(() => {
    if (alerts.length > 0) {
      const timer = setTimeout(() => {
        // Remove the first alert from the list
        const newAlerts = alerts.slice(1);
        alertList(newAlerts);
      }, 3000); // Adjust the delay time as needed (5000ms for 5 seconds).

      return () => clearTimeout(timer);
    }
  }, [alerts]);

  return (
    <>
      {alerts.length > 0 && (
        <div className="fixed top-10 flex w-full flex-col justify-center">
          {alerts.map((alert, index) => (
            <AlertItem key={uuidv4()} alert={alert} index={index} />
          ))}
        </div>
      )}
    </>
  );
};
