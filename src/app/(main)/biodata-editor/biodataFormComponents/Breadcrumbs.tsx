import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { steps } from "../steps";

interface BreadcrumbsProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  savedSteps: string[];
  biodataCompleted: number;
}

export default function Breadcrumbs({
  currentStep,
  setCurrentStep,
  savedSteps,
  biodataCompleted = 0,
}: BreadcrumbsProps) {
  return (
    <Breadcrumb className="max-w-6xl bg-[#f6f6f6] rounded-2xl p-2 mx-auto">
      <BreadcrumbList className="flex justify-center">
        {steps.map((step) => {
          const isDisabled =
            biodataCompleted === 100
              ? false
              : step.key === "first-words"
                ? false
                : !savedSteps.includes(step.prev);

          return (
            <BreadcrumbItem
              key={step.key}
              className="text-[#004972] rounded-full"
            >
              {step.key === currentStep ? (
                <BreadcrumbPage className="bg-[#e25a6f] text-white px-3 py-2 rounded-full">
                  {step.title}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  asChild
                  className={`hover:text-[#e25a6f] px-3 py-2 ${
                    isDisabled
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                >
                  <button
                    onClick={() => !isDisabled && setCurrentStep(step.key)}
                    disabled={isDisabled}
                  >
                    {step.title}
                  </button>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
