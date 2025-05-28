export interface IBiodata {
  id: string;
  code: string;
  biodataType: string;
  profilePic: string;
  status: string;
  visibility: string;
  token?: string | number;
}

export const mapApiToBiodataFormData = (apiData: any): Record<string, any> => {
  console.log("apiData", apiData.religiousInfoFormData);
  const biodata = {
    id: apiData?.id || "",
    code: apiData?.code || "",
    biodataType: apiData?.biodataType || "",
    profilePic: apiData?.profilePic || "",
    status: apiData?.status || "",
    visibility: apiData?.visibility || "",
    token: apiData?.token || "",
  };

  const biodataFormData = {
    firstWordsFormData: {
      preApprovalAcceptTerms: apiData?.preApprovalAcceptTerms || false,
      preApprovalOathTruthfulInfo:
        apiData?.preApprovalOathTruthfulInfo || false,
      preApprovalOathLegalResponsibility:
        apiData?.preApprovalOathLegalResponsibility || false,
    },
    primaryInfoFormData: {
      biodataType:
        apiData?.primaryInfoFormData?.[0]?.biodataType ||
        apiData?.primaryInfoFormData?.biodataType ||
        "",
      biodataFor:
        apiData?.primaryInfoFormData?.[0]?.biodataFor ||
        apiData?.primaryInfoFormData?.biodataFor ||
        "",
      fullName:
        apiData?.primaryInfoFormData?.[0]?.fullName ||
        apiData?.primaryInfoFormData?.fullName ||
        "",
      fatherName:
        apiData?.primaryInfoFormData?.[0]?.fatherName ||
        apiData?.primaryInfoFormData?.fatherName ||
        "",
      motherName:
        apiData?.primaryInfoFormData?.[0]?.motherName ||
        apiData?.primaryInfoFormData?.motherName ||
        "",
      email:
        apiData?.primaryInfoFormData?.[0]?.email ||
        apiData?.primaryInfoFormData?.email ||
        "",
      phoneNumber:
        apiData?.primaryInfoFormData?.[0]?.phoneNumber ||
        apiData?.primaryInfoFormData?.phoneNumber ||
        "",
      guardianContacts: apiData?.guardianContacts?.map((contact: any) => ({
        relation: contact?.relation || "",
        fullName: contact?.fullName || "",
        phoneNumber: contact?.phoneNumber || "",
      })) || [{ relation: "", fullName: "", phoneNumber: "" }],
    },
    generalInfoFormData: {
      dateOfBirth:
        apiData?.generalInfoFormData?.[0]?.dateOfBirth ||
        apiData?.generalInfoFormData?.dateOfBirth ||
        "",
      maritalStatus:
        apiData?.generalInfoFormData?.[0]?.maritalStatus ||
        apiData?.generalInfoFormData?.maritalStatus ||
        "",
      skinTone:
        apiData?.generalInfoFormData?.[0]?.skinTone ||
        apiData?.generalInfoFormData?.skinTone ||
        "",
      height:
        apiData?.generalInfoFormData?.[0]?.height ||
        apiData?.generalInfoFormData?.height ||
        "",
      weight:
        apiData?.generalInfoFormData?.[0]?.weight ||
        apiData?.generalInfoFormData?.weight ||
        "",
      bloodGroup:
        apiData?.generalInfoFormData?.[0]?.bloodGroup ||
        apiData?.generalInfoFormData?.bloodGroup ||
        "",
      nationality:
        apiData?.generalInfoFormData?.[0]?.nationality ||
        apiData?.generalInfoFormData?.nationality ||
        "",
    },
    addressInfoFormData: {
      addresses: apiData?.addressInfoFormData?.map((addr: any) => ({
        type: addr?.type || "",
        location: addr?.location || "",
        state: addr?.state || "",
        city: addr?.city || "",
        detail: addr?.detail || "",
        country: addr?.country || "",
        permanentHomeAddress: addr?.permanentHomeAddress || "",
        cityzenshipStatus: addr?.cityzenshipStatus || "",
      })) || [
        {
          type: "",
          location: "",
          state: "",
          city: "",
          detail: "",
          country: "",
          permanentHomeAddress: "",
          cityzenshipStatus: "",
        },
      ],
    },
    educationInfoFormData: {
      type:
        apiData?.educationInfoFormData?.[0]?.type ||
        apiData?.educationInfoFormData?.type ||
        "",
      highestDegree:
        apiData?.educationInfoFormData?.[0]?.highestDegree ||
        apiData?.educationInfoFormData?.highestDegree ||
        "",
      degrees: apiData?.educationDegrees?.map((deg: any) => ({
        degreeType: deg?.degreeType || "",
        name: deg?.name || "",
        institute: deg?.institute || "",
        passYear: deg?.passYear || "",
        group: deg?.group || "",
      })) || [
        { degreeType: "", name: "", institute: "", passYear: "", group: "" },
      ],
      religiousEducation:
        apiData?.educationInfoFormData?.[0]?.religiousEducation ||
        apiData?.educationInfoFormData?.religiousEducation ||
        [],
      detail:
        apiData?.educationInfoFormData?.[0]?.detail ||
        apiData?.educationInfoFormData?.detail ||
        "",
    },
    occupationInfoFormData: {
      occupations:
        apiData?.occupationInfoFormData?.[0]?.occupations ||
        apiData?.occupationInfoFormData?.occupations ||
        [],
      detail:
        apiData?.occupationInfoFormData?.[0]?.detail ||
        apiData?.occupationInfoFormData?.detail ||
        "",
      monthlyIncome:
        apiData?.occupationInfoFormData?.[0]?.monthlyIncome ||
        apiData?.occupationInfoFormData?.monthlyIncome ||
        "",
    },
    familyInfoFormData: {
      parentsAlive:
        apiData?.familyInfoFormData?.[0]?.parentsAlive ||
        apiData?.familyInfoFormData?.parentsAlive ||
        "",
      fatherOccupation:
        apiData?.familyInfoFormData?.[0]?.fatherOccupation ||
        apiData?.familyInfoFormData?.fatherOccupation ||
        "",
      motherOccupation:
        apiData?.familyInfoFormData?.[0]?.motherOccupation ||
        apiData?.familyInfoFormData?.motherOccupation ||
        "",
      siblings:
        apiData?.familySiblings?.map((sibling: any) => ({
          serial: sibling?.serial || "",
          type: sibling?.type || "",
          occupation: sibling?.occupation || "",
          maritalStatus: sibling?.maritalStatus || "",
          children: sibling?.children || "",
        })) || [],
      fatherSideDetail:
        apiData?.familyInfoFormData?.[0]?.fatherSideDetail ||
        apiData?.familyInfoFormData?.fatherSideDetail ||
        "",
      motherSideDetail:
        apiData?.familyInfoFormData?.[0]?.motherSideDetail ||
        apiData?.familyInfoFormData?.motherSideDetail ||
        "",
      familyType:
        apiData?.familyInfoFormData?.[0]?.familyType ||
        apiData?.familyInfoFormData?.familyType ||
        "",
      familyBackground:
        apiData?.familyInfoFormData?.[0]?.familyBackground ||
        apiData?.familyInfoFormData?.familyBackground ||
        "",
      livingCondition:
        apiData?.familyInfoFormData?.[0]?.livingCondition ||
        apiData?.familyInfoFormData?.livingCondition ||
        "",
      wealthDescription:
        apiData?.familyInfoFormData?.[0]?.wealthDescription ||
        apiData?.familyInfoFormData?.wealthDescription ||
        "",
    },
    religiousInfoFormData: {
      type:
        apiData?.religiousInfoFormData?.[0]?.type ||
        apiData?.religiousInfoFormData?.type ||
        "",
      ideology:
        apiData?.religiousInfoFormData?.[0]?.ideology ||
        apiData?.religiousInfoFormData?.ideology ||
        "",
      madhab:
        apiData?.religiousInfoFormData?.[0]?.madhab ||
        apiData?.religiousInfoFormData?.madhab ||
        "",
      praysFiveTimes:
        apiData?.religiousInfoFormData?.[0]?.praysFiveTimes ||
        apiData?.religiousInfoFormData?.praysFiveTimes ||
        "",
      hasQazaPrayers:
        apiData?.religiousInfoFormData?.[0]?.hasQazaPrayers ||
        apiData?.religiousInfoFormData?.hasQazaPrayers ||
        "",
      canReciteQuranProperly:
        apiData?.religiousInfoFormData?.[0]?.canReciteQuranProperly ||
        apiData?.religiousInfoFormData?.canReciteQuranProperly ||
        "",
      avoidsHaramIncome:
        apiData?.religiousInfoFormData?.[0]?.avoidsHaramIncome ||
        apiData?.religiousInfoFormData?.avoidsHaramIncome ||
        "",
      modestDressing:
        apiData?.religiousInfoFormData?.[0]?.modestDressing ||
        apiData?.religiousInfoFormData?.modestDressing ||
        "",
      followsMahramRules:
        apiData?.religiousInfoFormData?.[0]?.followsMahramRules ||
        apiData?.religiousInfoFormData?.followsMahramRules ||
        "",
      beliefAboutPirMurshidAndMazar:
        apiData?.religiousInfoFormData?.[0]?.beliefAboutPirMurshidAndMazar ||
        apiData?.religiousInfoFormData?.beliefAboutPirMurshidAndMazar ||
        "",
      practicingSince:
        apiData?.religiousInfoFormData?.[0]?.practicingSince ||
        apiData?.religiousInfoFormData?.practicingSince ||
        "",
      veilWithNiqab:
        apiData?.religiousInfoFormData?.[0]?.veilWithNiqab ||
        apiData?.religiousInfoFormData?.veilWithNiqab ||
        "",
    },
    personalInfoFormData: {
      beardStatus:
        apiData?.personalInfoFormData?.[0]?.beardStatus ||
        apiData?.personalInfoFormData?.beardStatus ||
        "",
      preferredOutfit:
        apiData?.personalInfoFormData?.[0]?.preferredOutfit ||
        apiData?.personalInfoFormData?.preferredOutfit ||
        "",
      entertainmentPreferences:
        apiData?.personalInfoFormData?.[0]?.entertainmentPreferences ||
        apiData?.personalInfoFormData?.entertainmentPreferences ||
        "",
      healthConditions:
        apiData?.personalInfoFormData?.[0]?.healthConditions ||
        apiData?.personalInfoFormData?.healthConditions ||
        "",
      personalTraits:
        apiData?.personalInfoFormData?.[0]?.personalTraits ||
        apiData?.personalInfoFormData?.personalTraits ||
        [],
      genderEqualityView:
        apiData?.personalInfoFormData?.[0]?.genderEqualityView ||
        apiData?.personalInfoFormData?.genderEqualityView ||
        "",
      lgbtqOpinion:
        apiData?.personalInfoFormData?.[0]?.lgbtqOpinion ||
        apiData?.personalInfoFormData?.lgbtqOpinion ||
        "",
      specialConditions:
        apiData?.personalInfoFormData?.[0]?.specialConditions ||
        apiData?.personalInfoFormData?.specialConditions ||
        [],
      aboutYourself:
        apiData?.personalInfoFormData?.[0]?.aboutYourself ||
        apiData?.personalInfoFormData?.aboutYourself ||
        "",
    },
    marriageInfoFormData: {
      reasonForRemarriage:
        apiData?.marriageInfoFormData?.[0]?.reasonForRemarriage ||
        apiData?.marriageInfoFormData?.reasonForRemarriage ||
        "",
      currentSpouseAndChildren:
        apiData?.marriageInfoFormData?.[0]?.currentSpouseAndChildren ||
        apiData?.marriageInfoFormData?.currentSpouseAndChildren ||
        "",
      previousMarriageAndDivorceDetails:
        apiData?.marriageInfoFormData?.[0]?.previousMarriageAndDivorceDetails ||
        apiData?.marriageInfoFormData?.previousMarriageAndDivorceDetails ||
        "",
      spouseDeathDetails:
        apiData?.marriageInfoFormData?.[0]?.spouseDeathDetails ||
        apiData?.marriageInfoFormData?.spouseDeathDetails ||
        "",
      childrenDetails:
        apiData?.marriageInfoFormData?.[0]?.childrenDetails ||
        apiData?.marriageInfoFormData?.childrenDetails ||
        "",
      guardianApproval:
        apiData?.marriageInfoFormData?.[0]?.guardianApproval ||
        apiData?.marriageInfoFormData?.guardianApproval ||
        "",
      continueStudy:
        apiData?.marriageInfoFormData?.[0]?.continueStudy ||
        apiData?.marriageInfoFormData?.continueStudy ||
        "",
      continueStudyDetails:
        apiData?.marriageInfoFormData?.[0]?.continueStudyDetails ||
        apiData?.marriageInfoFormData?.continueStudyDetails ||
        "",
      careerPlan:
        apiData?.marriageInfoFormData?.[0]?.careerPlan ||
        apiData?.marriageInfoFormData?.careerPlan ||
        "",
      careerPlanDetails:
        apiData?.marriageInfoFormData?.[0]?.careerPlanDetails ||
        apiData?.marriageInfoFormData?.careerPlanDetails ||
        "",
      residence:
        apiData?.marriageInfoFormData?.[0]?.residence ||
        apiData?.marriageInfoFormData?.residence ||
        "",
      arrangeHijab:
        apiData?.marriageInfoFormData?.[0]?.arrangeHijab ||
        apiData?.marriageInfoFormData?.arrangeHijab ||
        "",
      dowryExpectation:
        apiData?.marriageInfoFormData?.[0]?.dowryExpectation ||
        apiData?.marriageInfoFormData?.dowryExpectation ||
        "",
      allowShowingPhotoOnline:
        apiData?.marriageInfoFormData?.[0]?.allowShowingPhotoOnline ||
        apiData?.marriageInfoFormData?.allowShowingPhotoOnline ||
        "",
      additionalMarriageInfo:
        apiData?.marriageInfoFormData?.[0]?.additionalMarriageInfo ||
        apiData?.marriageInfoFormData?.additionalMarriageInfo ||
        "",
    },
    spousePreferenceInfoFormData: {
      age:
        apiData?.spousePreferenceInfoFormData?.[0]?.age ||
        apiData?.spousePreferenceInfoFormData?.age ||
        "",
      skinTone:
        apiData?.spousePreferenceInfoFormData?.[0]?.skinTone ||
        apiData?.spousePreferenceInfoFormData?.skinTone ||
        [],
      height:
        apiData?.spousePreferenceInfoFormData?.[0]?.height ||
        apiData?.spousePreferenceInfoFormData?.height ||
        "",
      educationalQualification:
        apiData?.spousePreferenceInfoFormData?.[0]?.educationalQualification ||
        apiData?.spousePreferenceInfoFormData?.educationalQualification ||
        "",
      religiousEducationalQualification:
        apiData?.spousePreferenceInfoFormData?.[0]
          ?.religiousEducationalQualification ||
        apiData?.spousePreferenceInfoFormData
          ?.religiousEducationalQualification ||
        [],
      address:
        apiData?.spousePreferenceInfoFormData?.[0]?.address ||
        apiData?.spousePreferenceInfoFormData?.address ||
        "",
      maritalStatus:
        apiData?.spousePreferenceInfoFormData?.[0]?.maritalStatus ||
        apiData?.spousePreferenceInfoFormData?.maritalStatus ||
        [],
      specialCategory:
        apiData?.spousePreferenceInfoFormData?.[0]?.specialCategory ||
        apiData?.spousePreferenceInfoFormData?.specialCategory ||
        [],
      religiousType:
        apiData?.spousePreferenceInfoFormData?.[0]?.religiousType ||
        apiData?.spousePreferenceInfoFormData?.religiousType ||
        [],
      occupation:
        apiData?.spousePreferenceInfoFormData?.[0]?.occupation ||
        apiData?.spousePreferenceInfoFormData?.occupation ||
        [],
      familyBackground:
        apiData?.spousePreferenceInfoFormData?.[0]?.familyBackground ||
        apiData?.spousePreferenceInfoFormData?.familyBackground ||
        [],
      secondMarriage:
        apiData?.spousePreferenceInfoFormData?.[0]?.secondMarriage ||
        apiData?.spousePreferenceInfoFormData?.secondMarriage ||
        "",
      location:
        apiData?.spousePreferenceInfoFormData?.[0]?.location ||
        apiData?.spousePreferenceInfoFormData?.location ||
        "",
      qualities:
        apiData?.spousePreferenceInfoFormData?.[0]?.qualities ||
        apiData?.spousePreferenceInfoFormData?.qualities ||
        "",
    },
    profilePicFormData: {
      photoId: apiData?.profilePicFormData || "",
    },
    finalWordsFormData: {
      postApprovalOathTruthfulInfo:
        apiData?.postApprovalOathTruthfulInfo || false,
      postApprovalOathNoMisuse: apiData?.postApprovalOathNoMisuse || false,
      postApprovalOathLegalResponsibility:
        apiData?.postApprovalOathLegalResponsibility || false,
      visibility: apiData?.visibility || "",
    },
  };

  return { biodata, biodataFormData };
};
