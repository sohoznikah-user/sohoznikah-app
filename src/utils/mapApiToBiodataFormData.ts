export const mapApiToBiodataFormData = (apiData: any): Record<string, any> => {
  console.log("apiData", apiData.religiousInfoFormData);
  const biodata = {
    id: apiData?.id || "",
    code: apiData?.code || "",
    biodataType: apiData?.biodataType || "",
    profilePic: apiData?.profilePic || "",
    status: apiData?.status || "",
    visibility: apiData?.visibility || "",
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
      biodataType: apiData?.primaryInfoFormData[0]?.biodataType || "",
      biodataFor: apiData?.primaryInfoFormData[0]?.biodataFor || "",
      fullName: apiData?.primaryInfoFormData[0]?.fullName || "",
      fatherName: apiData?.primaryInfoFormData[0]?.fatherName || "",
      motherName: apiData?.primaryInfoFormData[0]?.motherName || "",
      email: apiData?.primaryInfoFormData[0]?.email || "",
      phoneNumber: apiData?.primaryInfoFormData[0]?.phoneNumber || "",
      guardianContacts: apiData?.guardianContacts?.map((contact: any) => ({
        relation: contact?.relation || "",
        fullName: contact?.fullName || "",
        phoneNumber: contact?.phoneNumber || "",
      })) || [{ relation: "", fullName: "", phoneNumber: "" }],
    },
    generalInfoFormData: {
      dateOfBirth: apiData?.generalInfoFormData?.[0]?.dateOfBirth || "",
      maritalStatus: apiData?.generalInfoFormData?.[0]?.maritalStatus || "",
      skinTone: apiData?.generalInfoFormData?.[0]?.skinTone || "",
      height: apiData?.generalInfoFormData?.[0]?.height || "",
      weight: apiData?.generalInfoFormData?.[0]?.weight || "",
      bloodGroup: apiData?.generalInfoFormData?.[0]?.bloodGroup || "",
      nationality: apiData?.generalInfoFormData?.[0]?.nationality || "",
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
      type: apiData?.educationInfoFormData?.[0]?.type || "",
      highestDegree: apiData?.educationInfoFormData?.[0]?.highestDegree || "",
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
        apiData?.educationInfoFormData?.[0]?.religiousEducation || [],
      detail: apiData?.educationInfoFormData?.[0]?.detail || "",
    },
    occupationInfoFormData: {
      occupations: apiData?.occupationInfoFormData?.[0]?.occupations || [],
      detail: apiData?.occupationInfoFormData?.[0]?.detail || "",
      monthlyIncome: apiData?.occupationInfoFormData?.[0]?.monthlyIncome || "",
    },
    familyInfoFormData: {
      parentsAlive: apiData?.familyInfoFormData?.[0]?.parentsAlive || "",
      fatherOccupation:
        apiData?.familyInfoFormData?.[0]?.fatherOccupation || "",
      motherOccupation:
        apiData?.familyInfoFormData?.[0]?.motherOccupation || "",
      siblings:
        apiData?.familySiblings?.map((sibling: any) => ({
          serial: sibling?.serial || "",
          type: sibling?.type || "",
          occupation: sibling?.occupation || "",
          maritalStatus: sibling?.maritalStatus || "",
          children: sibling?.children || "",
        })) || [],
      fatherSideDetail:
        apiData?.familyInfoFormData?.[0]?.fatherSideDetail || "",
      motherSideDetail:
        apiData?.familyInfoFormData?.[0]?.motherSideDetail || "",
      familyType: apiData?.familyInfoFormData?.[0]?.familyType || "",
      familyBackground:
        apiData?.familyInfoFormData?.[0]?.familyBackground || "",
      livingCondition: apiData?.familyInfoFormData?.[0]?.livingCondition || "",
      wealthDescription:
        apiData?.familyInfoFormData?.[0]?.wealthDescription || "",
    },
    religiousInfoFormData: {
      type: apiData?.religiousInfoFormData?.[0]?.type || "",
      ideology: apiData?.religiousInfoFormData?.[0]?.ideology || "",
      madhab: apiData?.religiousInfoFormData?.[0]?.madhab || "",
      praysFiveTimes: apiData?.religiousInfoFormData?.[0]?.praysFiveTimes || "",
      hasQazaPrayers: apiData?.religiousInfoFormData?.[0]?.hasQazaPrayers || "",
      canReciteQuranProperly:
        apiData?.religiousInfoFormData?.[0]?.canReciteQuranProperly || "",
      avoidsHaramIncome:
        apiData?.religiousInfoFormData?.[0]?.avoidsHaramIncome || "",
      modestDressing: apiData?.religiousInfoFormData?.[0]?.modestDressing || "",
      followsMahramRules:
        apiData?.religiousInfoFormData?.[0]?.followsMahramRules || "",
      beliefAboutPirMurshidAndMazar:
        apiData?.religiousInfoFormData?.[0]?.beliefAboutPirMurshidAndMazar ||
        "",
      practicingSince:
        apiData?.religiousInfoFormData?.[0]?.practicingSince || "",
    },
    personalInfoFormData: {
      beardStatus: apiData?.personalInfoFormData?.[0]?.beardStatus || "",
      preferredOutfit:
        apiData?.personalInfoFormData?.[0]?.preferredOutfit || "",
      entertainmentPreferences:
        apiData?.personalInfoFormData?.[0]?.entertainmentPreferences || "",
      healthConditions:
        apiData?.personalInfoFormData?.[0]?.healthConditions || "",
      personalTraits: apiData?.personalInfoFormData?.[0]?.personalTraits || [],
      genderEqualityView:
        apiData?.personalInfoFormData?.[0]?.genderEqualityView || "",
      lgbtqOpinion: apiData?.personalInfoFormData?.[0]?.lgbtqOpinion || "",
      specialConditions:
        apiData?.personalInfoFormData?.[0]?.specialConditions || [],
      aboutYourself: apiData?.personalInfoFormData?.[0]?.aboutYourself || "",
    },
    marriageInfoFormData: {
      reasonForRemarriage:
        apiData?.marriageInfoFormData?.[0]?.reasonForRemarriage || "",
      currentSpouseAndChildren:
        apiData?.marriageInfoFormData?.[0]?.currentSpouseAndChildren || "",
      previousMarriageAndDivorceDetails:
        apiData?.marriageInfoFormData?.[0]?.previousMarriageAndDivorceDetails ||
        "",
      spouseDeathDetails:
        apiData?.marriageInfoFormData?.[0]?.spouseDeathDetails || "",
      childrenDetails:
        apiData?.marriageInfoFormData?.[0]?.childrenDetails || "",
      guardianApproval:
        apiData?.marriageInfoFormData?.[0]?.guardianApproval || "",
      continueStudy: apiData?.marriageInfoFormData?.[0]?.continueStudy || "",
      continueStudyDetails:
        apiData?.marriageInfoFormData?.[0]?.continueStudyDetails || "",
      careerPlan: apiData?.marriageInfoFormData?.[0]?.careerPlan || "",
      careerPlanDetails:
        apiData?.marriageInfoFormData?.[0]?.careerPlanDetails || "",
      residence: apiData?.marriageInfoFormData?.[0]?.residence || "",
      arrangeHijab: apiData?.marriageInfoFormData?.[0]?.arrangeHijab || "",
      dowryExpectation:
        apiData?.marriageInfoFormData?.[0]?.dowryExpectation || "",
      allowShowingPhotoOnline:
        apiData?.marriageInfoFormData?.[0]?.allowShowingPhotoOnline || "",
      additionalMarriageInfo:
        apiData?.marriageInfoFormData?.[0]?.additionalMarriageInfo || "",
    },
    spousePreferenceInfoFormData: {
      age: apiData?.spousePreferenceInfoFormData?.[0]?.age || "",
      skinTone: apiData?.spousePreferenceInfoFormData?.[0]?.skinTone || [],
      height: apiData?.spousePreferenceInfoFormData?.[0]?.height || "",
      educationalQualification:
        apiData?.spousePreferenceInfoFormData?.[0]?.educationalQualification ||
        "",
      religiousEducationalQualification:
        apiData?.spousePreferenceInfoFormData?.[0]
          ?.religiousEducationalQualification || [],
      address: apiData?.spousePreferenceInfoFormData?.[0]?.address || "",
      maritalStatus:
        apiData?.spousePreferenceInfoFormData?.[0]?.maritalStatus || [],
      specialCategory:
        apiData?.spousePreferenceInfoFormData?.[0]?.specialCategory || [],
      religiousType:
        apiData?.spousePreferenceInfoFormData?.[0]?.religiousType || [],
      occupation: apiData?.spousePreferenceInfoFormData?.[0]?.occupation || [],
      familyBackground:
        apiData?.spousePreferenceInfoFormData?.[0]?.familyBackground || [],
      secondMarriage:
        apiData?.spousePreferenceInfoFormData?.[0]?.secondMarriage || "",
      location: apiData?.spousePreferenceInfoFormData?.[0]?.location || "",
      qualities: apiData?.spousePreferenceInfoFormData?.[0]?.qualities || "",
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
