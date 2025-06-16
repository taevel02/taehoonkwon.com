import dayjs from "dayjs";

export function Footer() {
  return (
    <footer className="my-16 text-center">
      <p className="text-sm font-thin">&copy; {dayjs().year()} Taehoon Kwon</p>
    </footer>
  );
}
