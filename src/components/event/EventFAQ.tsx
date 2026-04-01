import { EventFAQ } from "@/lib/events";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function EventFAQs({ faqs }: { faqs: EventFAQ[] }) {
    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-gray-400" />
                Frequently Asked Questions
            </h2>
            <div className="space-y-3">
                {faqs.map((faq) => (
                    <details 
                        key={faq.id} 
                        className="group bg-gray-50/50 rounded-xl border border-gray-100 hover:border-blue-100 transition-all overflow-hidden"
                    >
                        <summary className="p-4 cursor-pointer list-none flex items-center justify-between font-bold text-gray-900 text-sm md:text-base">
                            <span className="flex-1 pr-6">{faq.question}</span>
                            <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="px-4 pb-4 prose prose-sm text-gray-600 border-t border-gray-100/50 pt-4 leading-relaxed">
                            {faq.answer}
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}
