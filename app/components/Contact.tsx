import { Instagram, Mail } from "lucide-react";

export default function ContactList() {
  return (
    <div className="flex gap-6 max-[320px]:flex-col max-[320px]:gap-0">
      <div className="flex items-center gap-2">
        <Mail size={16} />
        <a href="mailto:taevel02@gmail.com">taevel02@gmail.com</a>
      </div>
      <div className="flex items-center gap-2">
        <Instagram size={16} />
        <a href="https://www.instagram.com/taevel02/">taevel02</a>
      </div>
    </div>
  );
}
