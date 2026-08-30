import { EventAgenda } from "@/lib/events";
import { } from "lucide-react"; // No icons used anymore

export default function EventAgendaList({ agenda }: { agenda: EventAgenda[] }) {
    if (!agenda || agenda.length === 0) return null;

    const formatTime = (timeStr: string | null) => {
        if (!timeStr) return "";
        const trimmed = timeStr.trim();
        // Check if it's a pure time string like "19:00" or "19:00:00"
        if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(trimmed)) {
            const parts = trimmed.split(':');
            const hours = parseInt(parts[0], 10);
            const minutes = parts[1];
            const ampm = hours >= 12 ? 'pm' : 'am';
            const h12 = hours % 12 || 12;
            return `${h12}:${minutes} ${ampm}`;
        }
        const date = new Date(trimmed);
        if (isNaN(date.getTime())) return trimmed;
        return date.toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true,
            timeZone: 'Asia/Kolkata'
        });
    };

    return (
        <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Agenda</h2>
            <div className="space-y-4">
                {agenda.map((item, index) => (
                    <div key={item.id} className="relative flex gap-4">
                        {/* Timeline line */}
                        {index < agenda.length - 1 && (
                            <div className="absolute left-[3.25rem] top-7 bottom-0 w-px bg-gray-100" />
                        )}

                        <div className="min-w-[5.5rem] pt-1 text-right">
                            <div className="text-sm font-bold text-blue-600">
                                {formatTime(item.starts_at)}
                            </div>
                            <div className="text-xs text-gray-400">
                                {formatTime(item.ends_at)}
                            </div>
                        </div>

                        <div className="w-4 h-4 rounded-full bg-blue-100 border-4 border-blue-50 z-10 mt-2" />

                        <div className="flex-1 pb-4">
                            <h3 className="font-bold text-gray-900 text-base mb-1">{item.title}</h3>
                            {item.description && (
                                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                    {item.description}
                                </p>
                            )}
                            {item.speaker && (
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                                        {item.speaker.charAt(0)}
                                    </div>
                                    <span className="text-xs font-bold text-gray-700">{item.speaker}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
