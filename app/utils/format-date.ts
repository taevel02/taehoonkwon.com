import dayjs from "dayjs";
import "dayjs/locale/ko";

export function formatDate(date: string | Date, lang: string = "ko") {
  try {
    const d = dayjs(date);
    if (lang === "en") {
      return d.locale("en").format("D MMMM YYYY");
    }
    // For Korean, YYYY. MM. DD. format with leading zeros for a clean, consistent look
    return d.locale("ko").format("YYYY. MM. DD.");
  } catch {
    return "unknown";
  }
}
