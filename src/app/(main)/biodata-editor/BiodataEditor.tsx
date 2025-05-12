// File: src/app/(main)/biodata-editor/BiodataEditor.tsx
"use client";

// import { createBiodata } from "@/app/services/biodata.service";
// import {
//   clearBiodataFormData,
//   setBiodataFormData,
// } from "@/redux/features/biodata/biodataSlice";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { useSearchParams } from "next/navigation";
// import { useCallback, useMemo } from "react";
// import Breadcrumbs from "./biodataFormComponents/Breadcrumbs";
// import { steps } from "./steps";

// interface BiodataEditorProps {
//   biodataToEdit: any | null;
// }

// export default function BiodataEditor({ biodataToEdit }: BiodataEditorProps) {
//   const dispatch = useAppDispatch();
//   const biodataFormData = useAppSelector(
//     (state) => state.biodata.biodataFormData
//   );

//   const searchParams = useSearchParams();
//   const currentStepKey = searchParams.get("step") || steps[0].key;
//   const currentStep = useMemo(
//     () => steps.find((x) => x.key === currentStepKey),
//     [currentStepKey]
//   );

//   const setStep = useCallback(
//     (key: string) => {
//       const newSearchParams = new URLSearchParams(searchParams);
//       newSearchParams.set("step", key);
//       window.history.pushState(null, "", `?${newSearchParams.toString()}`);
//     },
//     [searchParams]
//   );

//   const FormComponent = useMemo(() => currentStep?.component, [currentStep]);

//   const handleFormDataUpdate = useCallback(
//     (data: any) => {
//       const cleanData = JSON.parse(JSON.stringify(data));
//       dispatch(
//         setBiodataFormData({
//           key: `${currentStepKey}FormData`,
//           data: cleanData,
//         })
//       );
//     },
//     [dispatch, currentStepKey]
//   );

//   const handleSave = useCallback(async () => {
//     if (!currentStep) return;

//     if (currentStep.key === "final-words") {
//       try {
//         const completeBiodata = JSON.parse(JSON.stringify(biodataFormData));
//         await createBiodata(completeBiodata);
//         dispatch(clearBiodataFormData());
//         setStep(steps[0].key);
//       } catch (error) {
//         console.error("Failed to save biodata:", error);
//       }
//     } else {
//       setStep(currentStep.next);
//     }
//   }, [currentStep, biodataFormData, setStep, dispatch]);

//   if (!FormComponent) return null;

//   return (
//     <>
//       <Breadcrumbs currentStep={currentStep?.key} setCurrentStep={setStep} />
//       <div className="mt-8 w-full">
//         <FormComponent
//           biodataFormData={biodataFormData}
//           setBiodataFormData={handleFormDataUpdate}
//           handleSave={handleSave}
//           currentStep={currentStep}
//           setCurrentStep={setStep}
//         />
//       </div>
//       {process.env.NODE_ENV === "development" && (
//         <pre className="text-sm bg-white p-2 rounded-md shadow">
//           {JSON.stringify(biodataFormData, null, 2)}
//         </pre>
//       )}
//     </>
//   );
// }

import { createBiodata } from "@/app/services/biodata.service";
import {
  clearBiodataFormData,
  setBiodataFormData,
} from "@/redux/features/biodata/biodataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import Breadcrumbs from "./biodataFormComponents/Breadcrumbs";
import { steps } from "./steps";

interface BiodataEditorProps {
  biodataToEdit: any | null;
}

export default function BiodataEditor({ biodataToEdit }: BiodataEditorProps) {
  const dispatch = useAppDispatch();
  const biodataFormData = useAppSelector(
    (state) => state.biodata.biodataFormData
  );

  const searchParams = useSearchParams();
  const currentStepKey = searchParams.get("step") || steps[0].key;
  const currentStep = useMemo(
    () => steps.find((x) => x.key === currentStepKey),
    [currentStepKey]
  );

  const setStep = useCallback(
    (key: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("step", key);
      window.history.pushState(null, "", `?${newSearchParams.toString()}`);
    },
    [searchParams]
  );

  const FormComponent = useMemo(() => currentStep?.component, [currentStep]);

  const handleFormDataUpdate = useCallback(
    (data: any) => {
      const cleanData = JSON.parse(JSON.stringify(data));
      dispatch(
        setBiodataFormData({
          key: `${currentStepKey}FormData`,
          data: cleanData,
        })
      );
    },
    [dispatch, currentStepKey]
  );

  const handleSave = useCallback(async () => {
    if (!currentStep) return;

    if (currentStep.key === "final-words") {
      try {
        const completeBiodata = JSON.parse(JSON.stringify(biodataFormData));
        await createBiodata(completeBiodata);
        dispatch(clearBiodataFormData());
        setStep(steps[0].key);
      } catch (error) {
        console.error("Failed to save biodata:", error);
      }
    } else {
      setStep(currentStep.next);
    }
  }, [currentStep, biodataFormData, setStep, dispatch]);

  if (!FormComponent) return null;

  return (
    <>
      <Breadcrumbs currentStep={currentStep?.key} setCurrentStep={setStep} />
      <div className="mt-8 w-full">
        <FormComponent
          biodataFormData={biodataFormData[`${currentStepKey}FormData`] || {}}
          setBiodataFormData={handleFormDataUpdate}
          handleSave={handleSave}
          currentStep={currentStep}
          setCurrentStep={setStep}
        />
      </div>
      {process.env.NODE_ENV === "development" && (
        <pre className="text-sm bg-white p-2 rounded-md shadow">
          {JSON.stringify(biodataFormData, null, 2)}
        </pre>
      )}
    </>
  );
}
