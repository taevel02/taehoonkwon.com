import { RiMailLine, RiInstagramLine } from "@remixicon/react";

export default function ContactList() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <RiMailLine size={16} />
        <a href="mailto:taevel02@gmail.com">taevel02@gmail.com</a>
      </div>
      <div className="flex items-center gap-2">
        <RiInstagramLine size={16} />
        <a href="https://www.instagram.com/taehoonkwon__/">taehoonkwon__</a>
      </div>
    </div>
  );
}
