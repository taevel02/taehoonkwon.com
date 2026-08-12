import { RiMailLine, RiThreadsLine } from "@remixicon/react";

export default function ContactList() {
  return (
    <address className="flex flex-col gap-1 not-italic text-sm">
      <div className="flex items-center gap-2">
        <RiMailLine size={16} className="text-muted-foreground" />
        <a href="mailto:taevel02@gmail.com">taevel02@gmail.com</a>
      </div>
      <div className="flex items-center gap-2">
        <RiThreadsLine size={16} className="text-muted-foreground" />
        <a href="https://www.threads.com/@theokwon_">theokwon_</a>
      </div>
    </address>
  );
}
