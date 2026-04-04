// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { Joyride, CallBackProps, STATUS, Step } from "react-joyride";
import { useRouter } from "next/navigation";

export default function Walkthrough() {
  const [run, setRun] = useState(false);

  useEffect(() => {
    // Check if new user
    const isNewUser = localStorage.getItem("is_new_user");
    if (isNewUser === "true") {
      setRun(true);
    }
  }, []);

  const steps: Step[] = [
    {
      target: "body",
      content: "Welcome to CarbonScope AI! Let's take a quick tour of your new production-ready dashboard.",
      placement: "center",
    },
    {
      target: ".tour-upload-zone",
      content: "Here you can upload your CSV or XLSX emission records. The AI pipeline will automatically extract, classify, and match them against real-world databases.",
      placement: "bottom",
    },
    {
      target: ".tour-metrics",
      content: "Your total calculated scope 3 emissions and confidence metrics will appear here in real-time.",
      placement: "bottom",
    },
    {
      target: ".tour-charts",
      content: "These charts dynamically update based on your actively uploaded records or the current demo dataset.",
      placement: "top",
    },
    {
      target: ".tour-demo-toggle",
      content: "You can toggle Demo Mode here to see how the dashboard looks with rich mock data, or switch back to view your own live production records.",
      placement: "bottom",
    }
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as string)) {
      setRun(false);
      localStorage.removeItem("is_new_user");
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "#10b981", // Emerald 500
          backgroundColor: "#141420",
          textColor: "#f8fafc",
          arrowColor: "#141420",
          overlayColor: "rgba(0, 0, 0, 0.75)",
        },
        buttonClose: {
          display: "none",
        },
        tooltipContainer: {
          textAlign: "left",
          fontSize: "14px",
        },
        buttonNext: {
          backgroundColor: "#10b981",
          borderRadius: "8px",
          padding: "8px 16px",
        },
        buttonBack: {
          color: "#94a3b8",
        },
        buttonSkip: {
          color: "#94a3b8",
        }
      }}
    />
  );
}
