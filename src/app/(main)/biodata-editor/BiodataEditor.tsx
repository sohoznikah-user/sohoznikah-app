// File: src/app/(main)/biodata-editor/BiodataEditor.tsx

"use client";

import { useCreateBiodataMutation } from "@/redux/features/admin/biodataApi";
import {
  clearBiodataFormData,
  updateBiodataFormData,
} from "@/redux/features/biodata/biodataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { toast } from "sonner";
import Breadcrumbs from "./biodataFormComponents/Breadcrumbs";
import { steps } from "./steps";

// Map step keys to Redux state keys
const stepKeyToStateKey: Record<string, string> = {
  "first-words": "firstWordsFormData",
  "primary-info": "primaryInfoFormData",
  "general-info": "generalInfoFormData",
  "address-info": "addressInfoFormData",
  "education-info": "educationInfoFormData",
  "occupation-info": "occupationInfoFormData",
  "family-info": "familyInfoFormData",
  "religious-info": "religiousInfoFormData",
  "personal-info": "personalInfoFormData",
  "marriage-info": "marriageInfoFormData",
  "spouse-preference-info": "spousePreferenceInfoFormData",
  "profile-pic": "profilePicFormData",
  "final-words": "finalWordsFormData",
};

interface BiodataEditorProps {
  biodataToEdit: any | null;
}

export default function BiodataEditor({ biodataToEdit }: BiodataEditorProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const biodataFormData = useAppSelector(
    (state) => state.biodata.biodataFormData
  );
  const { user, acesstoken } = useAppSelector((state) => state.auth);
  const [createBiodata, { isLoading }] = useCreateBiodataMutation();

  const searchParams = useSearchParams();
  const currentStepKey = searchParams.get("step") || steps[0].key;
  const currentStep = useMemo(
    () => steps.find((x) => x.key === currentStepKey),
    [currentStepKey]
  );

  useEffect(() => {
    if (!user || !acesstoken) {
      const redirectUrl = `/biodata-editor?step=${currentStepKey}`;
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
    }
  }, [user, acesstoken, router, currentStepKey]);

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
      const stateKey = stepKeyToStateKey[currentStepKey] || currentStepKey;
      dispatch(
        updateBiodataFormData({
          key: stateKey,
          data: cleanData,
        })
      );
    },
    [dispatch, currentStepKey]
  );

  const handleSave = useCallback(async () => {
    if (!currentStep || !user) return;

    if (currentStep.key === "final-words") {
      try {
        const completeBiodata = {
          userId: user.userId,
          ...JSON.parse(JSON.stringify(biodataFormData)),
        };
        const result = await createBiodata(completeBiodata).unwrap();
        if (result.success) {
          toast.success("Biodata created successfully!");
          dispatch(clearBiodataFormData());
          setStep(steps[0].key);
          router.push("/dashboard");
        } else {
          toast.error(result.message || "Failed to create biodata.");
        }
      } catch (error: any) {
        console.error("Failed to save biodata:", error);
        toast.error(error?.message || "Failed to create biodata.");
      }
    } else {
      setStep(currentStep.next);
    }
  }, [
    currentStep,
    biodataFormData,
    setStep,
    dispatch,
    createBiodata,
    user,
    router,
  ]);

  if (!FormComponent || !user) return null;

  return (
    <div className="container mx-auto p-4">
      <Breadcrumbs currentStep={currentStepKey} setCurrentStep={setStep} />
      <FormComponent
        biodataFormData={biodataFormData}
        setBiodataFormData={handleFormDataUpdate}
        handleSave={handleSave}
        currentStep={currentStep}
        setCurrentStep={setStep}
      />
      {process.env.NODE_ENV === "development" && (
        <pre>{JSON.stringify(biodataFormData, null, 2)}</pre>
      )}
    </div>
  );
}
