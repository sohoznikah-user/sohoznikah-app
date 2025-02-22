import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function DashboardMainContactUs() {
  const tabs = ["জিজ্ঞাসা", "অভিযোগ", "পরামর্শ", "মন্তব্য"];

  return (
    <Tabs defaultValue="জিজ্ঞাসা" className="bg-[#f2f4fc] p-4 rounded-xl gap-0">
      <TabsList className="bg-[#5b8eaa] text-white p-0">
        {tabs.map((x) => (
          <TabsTrigger
            key={x}
            className="p-0 data-[state=active]:bg-[#f2f4fc] data-[state=active]:text-black"
            value={x}
          >
            <div className="px-4 py-2">{x}</div>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((x) => (
        <TabsContent value={x}>
          <ContactUsCard />
        </TabsContent>
      ))}
    </Tabs>
  );
}

export function ContactUsCard() {
  return (
    <Card className="bg-transparent border-none shadow-none p-4">
      <CardContent className="flex p-0 items-center space-x-8">
        <Textarea
          className="bg-white text-black selection:bg-[#E25A6F] selection:text-white"
          id="comment"
        />
        <Button className="bg-[#5b8eaa] text-white">Send</Button>
      </CardContent>
    </Card>
  );
}
