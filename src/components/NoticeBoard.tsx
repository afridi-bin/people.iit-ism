import { resources } from "@/lib/data";

export default function NoticeBoard() {
  return (
    <ol className="divide-y divide-line">
      {resources.notices.map((n, i) => (
        <li key={n.title}>
          <a
            href={n.href ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-4 py-4 hover:bg-brand-50/60"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
              {i + 1}
            </span>
            <span className="text-sm font-medium leading-snug text-ink group-hover:text-brand-600">{n.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
