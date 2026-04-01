import { EventTag } from "@/lib/events";
import { Hash } from "lucide-react";
import Link from "next/link";

export default function EventTags({ tags }: { tags: EventTag[] }) {
    if (!tags || tags.length === 0) return null;

    return (
        <section className="mb-6 flex flex-wrap gap-2 items-center">
            {tags.map((item) => (
                <Link 
                    key={item.tag_id}
                    href={`/events?tag=${item.tag?.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 hover:bg-white hover:border-blue-200 border border-transparent shadow-sm rounded-full text-xs font-bold text-gray-700 transition-all group"
                >
                    <Hash className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    {item.tag?.name}
                </Link>
            ))}
        </section>
    );
}
