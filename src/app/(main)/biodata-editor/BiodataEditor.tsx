"use client";

import Loading from "@/app/loading";
import {
  useGetMyBiodataQuery,
  useUpdateMyBiodataMutation,
} from "@/redux/features/biodata/biodataApi";
import {
  setAllBiodata,
  setAllBiodataFormData,
  updateBiodataFormData,
} from "@/redux/features/biodata/biodataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { mapApiToBiodataFormData } from "@/utils/mapApiToBiodataFormData";
import { mapBiodataFormDataToApi } from "@/utils/mapBiodataFormDataToApi";
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
  const { biodata, biodataFormData } = useAppSelector((state) => state.biodata);
  const { user, acesstoken } = useAppSelector((state) => state.auth);
  const [updateMyBiodata, { isLoading: isUpdating }] =
    useUpdateMyBiodataMutation();
  const {
    data: fetchedBiodata,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetMyBiodataQuery(undefined, {
    skip: !user || !acesstoken,
  });

  const searchParams = useSearchParams();
  const currentStepKey = searchParams.get("step") || steps[0].key;
  const currentStep = useMemo(
    () => steps.find((x) => x.key === currentStepKey),
    [currentStepKey]
  );

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user || !acesstoken) {
      const redirectUrl = `/biodata-editor?step=${currentStepKey}`;
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
    }
  }, [user, acesstoken, router, currentStepKey]);

  // Populate Redux with fetched biodata
  useEffect(() => {
    if (fetchedBiodata?.data) {
      const mapped = mapApiToBiodataFormData(fetchedBiodata.data);
      dispatch(setAllBiodataFormData(mapped.biodataFormData));
      dispatch(setAllBiodata(mapped.biodata));
    }
  }, [fetchedBiodata, dispatch]);

  // Handle fetch errors
  useEffect(() => {
    if (fetchError) {
      toast.error("Failed to fetch biodata. Please try again.");
    }
  }, [fetchError]);

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

    try {
      const stepKey = stepKeyToStateKey[currentStepKey];
      const formData = biodataFormData?.[stepKey];

      if (!formData) {
        toast.error("No data to save for this step.");
        return;
      }

      const completeBiodata = {
        [stepKey]: formData,
      };

      const payload = mapBiodataFormDataToApi(currentStepKey, formData);
      console.log("Saving data:", { completeBiodata, payload });

      const result = await updateMyBiodata(completeBiodata).unwrap();
      if (result.success) {
        toast.success("Biodata saved successfully!");
        await refetch(); // Sync state again
        setStep(currentStep.next);
      } else {
        toast.error(result.message || "Failed to save biodata.");
      }
    } catch (error: any) {
      console.error("Failed to save biodata:", error);
      toast.error(error?.message || "Failed to create biodata.");
    }
  }, [
    currentStep,
    biodataFormData,
    setStep,
    dispatch,
    updateMyBiodata,
    user,
    router,
    currentStepKey,
    refetch,
  ]);

  if (isFetching) return <Loading />;
  if (!FormComponent || !user) return null;

  return (
    <div className="container mx-auto p-4">
      <Breadcrumbs currentStep={currentStepKey} setCurrentStep={setStep} />
      <FormComponent
        biodataFormData={biodataFormData}
        handleSave={handleSave}
        setBiodataFormData={handleFormDataUpdate}
        currentStep={currentStep}
        setCurrentStep={setStep}
      />
      {/* <button
        onClick={() => dispatch(clearBiodataFormData())}
        className="bg-red-500 text-white px-4 py-2 rounded-md mx-auto block cursor-pointer mt-5"
      >
        Clear Biodata
      </button> */}
      {/* {process.env.NODE_ENV === "development" && (
        <>
          <pre>{JSON.stringify(biodataFormData, null, 2)}</pre>
          <pre>{JSON.stringify(biodata, null, 2)}</pre>
        </>
      )} */}
    </div>
  );
}
