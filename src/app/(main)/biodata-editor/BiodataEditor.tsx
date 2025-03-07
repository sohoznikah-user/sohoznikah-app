"use client";

import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./biodataFormComponents/Breadcrumbs";
import { createBiodata } from "@/app/services/biodata.service";
import { useBiodataFormDataStore } from "@/store/biodataFormData.store";

interface BiodataEditorProps {
  biodataToEdit: any | null;
}

export default function BiodataEditor({ biodataToEdit }: BiodataEditorProps) {
  const searchParams = useSearchParams();
  const currentStepKey = searchParams.get("step") || steps[0].key;
  const currentStep = steps.find((x) => x.key === currentStepKey);
  const { biodataFormData, setBiodataFormData } = useBiodataFormDataStore();

  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  const FormComponent = steps.find(
    (step) => step.key === currentStep.key
  )?.component;

  const handleSave = async () => {
    switch (currentStep.key) {
      case "first-words":
        const response = await createBiodata(
          biodataFormData.firstWordsFormData
        );
        setStep(currentStep.next);
        break;
      case "primary-info":
        break;
      case "general-info":
        break;
      case "address-info":
        break;
      case "education-info":
        break;
      case "occupation-info":
        break;
      case "family-info":
        break;
      case "religion-info":
        break;
      case "personal-info":
        break;
      case "marital-info":
        break;
      case "partner-info":
        break;
      case "profile-pic":
        break;
      case "final-words":
        break;
    }
  };

  return (
    <>
      <Breadcrumbs currentStep={currentStep.key} setCurrentStep={setStep} />
      <div className="mt-8 w-full">
        {FormComponent && (
          <FormComponent
            biodataFormData={biodataFormData}
            setBiodataFormData={setBiodataFormData}
            handleSave={handleSave}
            currentStep={currentStep}
            setCurrentStep={setStep}
          />
        )}
      </div>
      <pre className="text-sm bg-white p-2 rounded-md shadow">
        {JSON.stringify(biodataFormData, null, 2)}
      </pre>
    </>
  );
}
