import { EventCohost } from "@/lib/events";
import Image from "next/image";
import { User } from "lucide-react";

export default function EventCohosts({ cohosts }: { cohosts: EventCohost[] }) {
    if (!cohosts || cohosts.length === 0) return null;

    return (
        <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <User className="w-5 h-5 text-gray-400" />
                Event Hosts
            </h2>
            <div className="flex flex-wrap gap-4">
                {cohosts.map((cohost) => (
                    <div key={cohost.id} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-blue-100 transition-colors">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-blue-50 flex items-center justify-center">
                            {cohost.user?.avatar_url ? (
                                <Image 
                                    src={cohost.user.avatar_url} 
                                    alt={cohost.user.username} 
                                    fill 
                                    className="object-cover"
                                />
                            ) : (
                                <User className="w-6 h-6 text-blue-200" />
                            )}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm">{cohost.user?.username}</p>
                            <p className="text-xs text-gray-500 font-medium">{cohost.role || "Co-host"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
