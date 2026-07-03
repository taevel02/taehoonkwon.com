import { RiMailLine, RiTwitterXFill } from "@remixicon/react";

export default function ContactList() {
  return (
    <address className="flex flex-col gap-1 not-italic text-sm">
      <div className="flex items-center gap-2">
        <RiTwitterXFill size={16} className="text-muted-foreground" />
        <a href="https://x.com/theokwon__">@theokwon__</a>
      </div>
      <div className="flex items-center gap-2">
        <RiMailLine size={16} className="text-muted-foreground" />
        <a href="mailto:taevel02@gmail.com">taevel02@gmail.com</a>
      </div>
    </address>
  );
}
