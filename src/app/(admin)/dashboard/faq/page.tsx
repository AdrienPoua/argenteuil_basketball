import Form from "./components/Form";
import Accordion from "./components/Accordion";
import { FAQService } from "@/database/services/FAQ";

export default async function Index() {
  const faqService = new FAQService();
  const faqs = await faqService.getFaqs();
  return (
    <div className="flex flex-col grow w-full gap-5">
      <Form />
      <div className="flex flex-col gap-3 w-[1000px] mx-auto">
        {faqs.map((faq) => (
          <Accordion key={faq.id} faq={faq} />
        ))}
      </div>
    </div>
  );
}
