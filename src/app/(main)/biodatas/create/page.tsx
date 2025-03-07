"use client";

import { useSearchParams } from "next/navigation";
import { steps } from "../steps";
import Breadcrumbs from "../biodataFormComponents/Breadcrumbs";
import { useCreateBiodataFormStore } from "@/store/createBiodataForm.store";

export default function CreateBiodataPage() {
  const searchParams = useSearchParams();
  const { biodataForm, setBiodataForm } = useCreateBiodataFormStore();
  const currentStep = searchParams.get("step") || steps[0].key;

  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };
  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;

  return (
    <div className="text-[#1f4f69] flex flex-col items-center justify-center mt-4 mb-12">
      <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
      <div className="mt-8 w-full">
        {FormComponent && (
          <FormComponent
            biodataForm={biodataForm}
            setBiodataForm={setBiodataForm}
            setCurrentStep={setStep}
          />
        )}
      </div>
      <pre className="text-sm bg-white p-2 rounded-md shadow">
        {JSON.stringify(biodataForm, null, 2)}
      </pre>
    </div>
  );
}
