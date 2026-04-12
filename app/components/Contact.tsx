import { RiMailLine, RiMapPin2Line, RiWhatsappLine } from "@remixicon/react";

export default function ContactList() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <RiMapPin2Line size={16} className="text-muted-foreground" />
        <span>Australia</span>
      </div>
      <div className="flex items-center gap-2">
        <RiMailLine size={16} className="text-muted-foreground" />
        <a href="mailto:taevel02@gmail.com">taevel02@gmail.com</a>
      </div>
    </div>
  );
}
