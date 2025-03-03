import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { steps } from "../steps";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  currentStep: string;
}

export default function Breadcrumbs({ currentStep }: BreadcrumbsProps) {
  return (
    <Breadcrumb className="max-w-6xl bg-[#f6f6f6] rounded-2xl p-2">
      <BreadcrumbList className="flex justify-center">
        {steps.map((step) => (
          <BreadcrumbItem key={step.key} className="rounded-full">
            <BreadcrumbPage
              className={cn(
                "px-3 py-2 text-[#004972]",
                step.key === currentStep &&
                  "bg-[#e25a6f] text-white rounded-full"
              )}
            >
              {step.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
