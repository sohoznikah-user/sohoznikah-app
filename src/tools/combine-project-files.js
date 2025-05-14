const fs = require("fs");
const path = require("path");

// 1) Directories and files to include
const selectedModules = [
  // Root-level files in src
  // "../app/layout.tsx",
  // "../app/HomeSearchBioData.tsx",
  // "../app/globals.css",
  // "../app/loading.tsx",
  // "../app/page.tsx",
  // New directories
  // "../interfaces",
  // "../services",
  // app and its subdirectories
  "../app",
  "../app/(main)",
  // biodata-editor paths
  "../app/(main)/biodata-editor",
  "../app/(main)/biodata-editor/bioDataFormComponents",
  // "../app/(main)/biodata-editor/bioDataFormComponents/AddressInfo.tsx",
  // "../app/(main)/biodata-editor/bioDataFormComponents/Breadcrumbs.tsx",
  // "../app/(main)/biodata-editor/bioDataFormComponents/EducationInfo.tsx",
  // "../app/(main)/biodata-editor/bioDataFormComponents/FamilyInfo.tsx",
  // "../app/(main)/biodata-editor/bioDataFormComponents/FinallyWords.tsx",
  // "../app/(main)/biodata-editor/bioDataFormComponents/FirstWords.tsx",
  // "../app/(main)/biodata-editor/bioDataFormComponents/GeneralInfo.tsx",
  // "../app/(main)/biodata-editor/bioDataFormComponents/MarriageInfo.tsx",
  // "../app/(main)/biodata-editor/bioDataFormComponents/OccupationInfo.tsx",
  // "../app/(main)/biodata-editor/bioDataFormComponents/PersonalInfo.tsx",
  // "../app/(main)/biodata-editor/bioDataFormComponents/PrimaryInfo.tsx",
  // "../app/(main)/biodata-editor/bioDataFormComponents/ProfilePic.tsx",
  // "../app/(main)/biodata-editor/bioDataFormComponents/ReligiousInfo.tsx",
  // "../app/(main)/biodata-editor/bioDataFormComponents/SpousePreferenceInfo.tsx",
  // "../app/(main)/biodata-editor/bioDataFormComponents/BioDataEditor.tsx",
  // "../app/(main)/biodata-editor/bioDataFormComponents/page.tsx",
  // "../app/(main)/biodata-editor/bioDataFormComponents/steps.tsx",
  // biodatas paths
  "../app/(main)/biodatas",
  "../app/(main)/biodatas/listPageComponentes",
  // "../app/(main)/biodatas/listPageComponentes/BiodatasPageCard.tsx",
  // "../app/(main)/biodatas/listPageComponentes/BiodatasPageFilters.tsx",
  // "../app/(main)/biodatas/listPageComponentes/BiodatasPageSearchByBiodataNo.tsx",
  // "../app/(main)/biodatas/listPageComponentes/BiodatasPageAppliedFilters.tsx",
  // bioDataFormComponents under biodatas
  "../app/(main)/biodatas/bioDataFormComponents",
  // "../app/(main)/biodatas/bioDataFormComponents/AddressInfo.tsx",
  // "../app/(main)/biodatas/bioDataFormComponents/Breadcrumbs.tsx",
  // "../app/(main)/biodatas/bioDataFormComponents/EducationInfo.tsx",
  // "../app/(main)/biodatas/bioDataFormComponents/FamilyInfo.tsx",
  // "../app/(main)/biodatas/bioDataFormComponents/FinallyWords.tsx",
  // "../app/(main)/biodatas/bioDataFormComponents/FirstWords.tsx",
  // "../app/(main)/biodatas/bioDataFormComponents/GeneralInfo.tsx",
  // "../app/(main)/biodatas/bioDataFormComponents/MarriageInfo.tsx",
  // "../app/(main)/biodatas/bioDataFormComponents/OccupationInfo.tsx",
  // "../app/(main)/biodatas/bioDataFormComponents/PersonalInfo.tsx",
  // "../app/(main)/biodatas/bioDataFormComponents/PrimaryInfo.tsx",
  // "../app/(main)/biodatas/bioDataFormComponents/ProfilePic.tsx",
  // "../app/(main)/biodatas/bioDataFormComponents/ReligiousInfo.tsx",
  // "../app/(main)/biodatas/bioDataFormComponents/SpousePreferenceInfo.tsx",
  // "../app/(main)/biodatas/bioDataFormComponents/BioDataEditor.tsx",
  // "../app/(main)/biodatas/bioDataFormComponents/page.tsx",
  // "../app/(main)/biodatas/bioDataFormComponents/steps.tsx",
  // viewBioDataComponents
  "../app/(main)/biodatas/[id]/viewBioDataComponents",
  // "../app/(main)/biodatas/[id]/viewBioDataComponents/AddressInfo.tsx",
  // "../app/(main)/biodatas/[id]/viewBioDataComponents/EducationAndOccupationInfo.tsx",
  // "../app/(main)/biodatas/[id]/viewBioDataComponents/FamilyInfo.tsx",
  // "../app/(main)/biodatas/[id]/viewBioDataComponents/HeaderShortBio.tsx",
  // "../app/(main)/biodatas/[id]/viewBioDataComponents/HeaderSpousePreferenceRequirement.tsx",
  // "../app/(main)/biodatas/[id]/viewBioDataComponents/MarriageInfo.tsx",
  // "../app/(main)/biodatas/[id]/viewBioDataComponents/PersonalInfo.tsx",
  // "../app/(main)/biodatas/[id]/viewBioDataComponents/PrimaryInfo.tsx",
  // "../app/(main)/biodatas/[id]/viewBioDataComponents/ReligiousInfo.tsx",
  // "../app/(main)/biodatas/[id]/viewBioDataComponents/SpousePreferenceInfo.tsx",
  "../app/(main)/biodatas/[id]/page.tsx",
  // dashboard
  // "../app/(main)/biodatas/dashboard",
  // "../app/(main)/biodatas/dashboard/DashboardLeftNav.tsx",
  // "../app/(main)/biodatas/dashboard/DashboardMainBioStatus.tsx",
  // "../app/(main)/biodatas/dashboard/DashboardMainContactUs.tsx",
  // "../app/(main)/biodatas/dashboard/DashboardMainContent.tsx",
  // "../app/(main)/biodatas/dashboard/DashboardMainMyActivityStatus.tsx",
  // "../app/(main)/biodatas/dashboard/DashboardMainMyBioStatus.tsx",
  // "../app/(main)/biodatas/dashboard/DashboardMainNotifications.tsx",
  // "../app/(main)/biodatas/dashboard/DashboardRightSection.tsx",
  // "../app/(main)/biodatas/dashboard/page.tsx",
  // Redux paths
  "../redux",
  "../redux/api",
  // "../redux/api/baseApi.ts",
  "../redux/features",
  "../redux/features/admin",
  "../redux/features/auth",
  // "../redux/features/auth/authApi.ts",
  // "../redux/features/auth/authSlice.ts",
  "../redux/features/biodata",
  // "../redux/features/biodata/bioDataSlice.ts",
  "../redux/reducer",
  // "../redux/reducer/rootReducer.ts",
  // "../redux/hooks.ts",
  // "../redux/store.ts",
  // "../redux/tag-types.ts",
  // Other directories
  // "../components",
  // "../utils",
  // "../types",
  // "../constant",
  "../lib",
  "../helpers",
  "../hooks",
  // "../assets",
].map((dir) => path.join(__dirname, dir));

// 2) Output file path
const outputFile = path.join(__dirname, "project-files-combined.txt");

// Files to exclude
const excludeFiles = [
  "tsconfig.tsbuildinfo",
  ".env",
  "favicon.ico",
  ".eslintrc.js",
  "jest.config.js",
  "tsconfig.json",
  ".env.docker",
  ".env.local",
  "eslint.config.js",
  "next-env.d.ts",
  "postcss.config.mjs",
  "components.json",
  "package.json",
  "package-lock.json",
  "LICENSE",
  ".gitignore",
];

// Folders to exclude
const excludeFolders = [
  "node_modules",
  ".next",
  "dist",
  "public",
  ".turbo",
  "test",
  "test-e2e",
  "test-results",
  ".git",
];

/**
 * Get all files from a directory recursively
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) {
    console.warn(`[WARN] Directory not found: ${dirPath} (ignored)`);
    return arrayOfFiles;
  }

  if (
    excludeFolders.some(
      (folder) =>
        dirPath.includes(`${path.sep}${folder}${path.sep}`) ||
        dirPath.endsWith(`${path.sep}${folder}`)
    )
  ) {
    return arrayOfFiles;
  }

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, arrayOfFiles);
    } else {
      if (!excludeFiles.includes(file)) {
        arrayOfFiles.push(filePath);
      }
    }
  }

  return arrayOfFiles;
}

/**
 * Combine all files and write to output file
 */
function combineFiles() {
  console.log("[INFO] Collecting files from selected modules...");

  // Process both files and directories in selectedModules
  const allFiles = [];

  for (const modPath of selectedModules) {
    if (!fs.existsSync(modPath)) {
      console.warn(`[WARN] Path not found: ${modPath} (ignored)`);
      continue;
    }

    const stat = fs.statSync(modPath);
    if (stat.isFile()) {
      // If it's a file, add it directly (if not excluded)
      const fileName = path.basename(modPath);
      if (!excludeFiles.includes(fileName)) {
        allFiles.push(modPath);
      }
    } else if (stat.isDirectory()) {
      // If it's a directory, recursively get all files
      const filesFromDir = getAllFiles(modPath);
      allFiles.push(...filesFromDir);
    }
  }

  console.log(`[INFO] Processing ${allFiles.length} files.`);

  let combinedContent = "";

  allFiles.forEach((filePath) => {
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      combinedContent += `// --------------------\n`;
      combinedContent += `// File: ${filePath}\n`;
      combinedContent += `// --------------------\n`;
      combinedContent += `${content}\n\n`;
    } catch (err) {
      console.error(`[ERROR] Failed to read file: ${filePath}`, err);
    }
  });

  fs.writeFileSync(outputFile, combinedContent);
  console.log(`✅ Combined files have been saved to => ${outputFile}`);
}

// Execute the script
combineFiles();

// node src/tools/combine-project-files.js
