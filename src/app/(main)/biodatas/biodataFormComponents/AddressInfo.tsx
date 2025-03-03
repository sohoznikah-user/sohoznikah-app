import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { addressTypes, citizenshipOptions } from "@/lib/consts";

export default function AddressInfo() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-3xl text-center text-black">ঠিকানা</div>
      <div className="max-w-4xl w-full text-[#005889] flex flex-col space-y-6">
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            স্থায়ী ঠিকানা:
          </Label>
          <Select>
            <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
              <SelectValue placeholder="ঠিকানা" />
            </SelectTrigger>
            <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
              {addressTypes.map((x) => (
                <SelectItem
                  key={x.id}
                  className="focus:bg-transparent focus:text-[#E25A6F] p-2"
                  value={x.id}
                >
                  {x.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            স্থায়ী জেলা:
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            <div>স্থায়ী উপজেলা:</div>
            <div className="text-xs">
              <div>(যদি থাকে)</div>
            </div>
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            স্থায়ী বাড়ির ঠিকানা:
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            বর্তমান ঠিকানা:
          </Label>
          <Select>
            <SelectTrigger className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889]">
              <SelectValue placeholder="ঠিকানা" />
            </SelectTrigger>
            <SelectContent className="bg-[#f6f6f6] text-[#005889] border-none">
              {addressTypes.map((x) => (
                <SelectItem
                  key={x.id}
                  className="focus:bg-transparent focus:text-[#E25A6F] p-2"
                  value={x.id}
                >
                  {x.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            দেশের নাম:
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            <div>স্টেট:</div>
            <div className="text-xs">
              <div>(যদি থাকে)</div>
            </div>
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            শহর:
          </Label>
          <Input
            className="p-6 bg-[#f6f6f6] border-none shadow-none rounded-xl text-[#005889] selection:bg-[#E25A6F] selection:text-white"
            id="emailMobileNumber"
            type="text"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Label className="text-md space-y-1" htmlFor="emailMobileNumber">
            সিটিজেনশিপ আছে?
          </Label>
          <RadioGroup className="w-full flex flex-wrap gap-0">
            {citizenshipOptions.map((x) => (
              <div key={x.id} className="w-1/3 flex items-center space-x-2">
                <RadioGroupItem value={x.id} id={x.id} />
                <Label htmlFor={x.id}>{x.title}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="max-w-4xl w-full space-x-2">
        <Button className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F]">
          Previous
        </Button>
        <Button className="bg-[#E25A6F] text-white rounded-lg hover:bg-[#D14A5F]">
          Next
        </Button>
      </div>
    </div>
  );
}
