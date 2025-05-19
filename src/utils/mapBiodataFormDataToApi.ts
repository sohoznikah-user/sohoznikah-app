export const mapBiodataFormDataToApi = (
  stepKey: string,
  formData: any
): Record<string, any> => {
  // console.log("stepKey in mapBiodataFormDataToApi", stepKey);
  // console.log("formData in mapBiodataFormDataToApi", formData);

  switch (stepKey) {
    case "primary-info":
      return { primaryInfoFormData: formData };

    case "general-info":
      return { generalInfoFormData: formData };

    case "address-info":
      return { addressInfoFormData: formData.addresses };

    case "education-info":
      const { degrees, ...eduRest } = formData;
      return {
        educationInfoFormData: eduRest,
        educationDegrees: degrees,
      };

    case "occupation-info":
      return { occupationInfoFormData: formData };

    case "family-info":
      const { siblings, ...familyRest } = formData;
      return {
        familyInfoFormData: familyRest,
        familySiblings: siblings,
      };

    case "religious-info":
      return { religiousInfoFormData: formData };

    case "personal-info":
      return { personalInfoFormData: formData };

    case "marriage-info":
      return { marriageInfoFormData: formData };

    case "spouse-preference-info":
      return { spousePreferenceInfoFormData: formData };

    case "profile-pic":
      return { profilePic: formData?.profilePic };

    default:
      return {};
  }
};
