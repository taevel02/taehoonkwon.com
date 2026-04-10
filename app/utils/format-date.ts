import dayjs from "dayjs";

export function formatDate(date: string | Date) {
  try {
    return dayjs(date).format("YYYY. M. D.");
  } catch {
    return "unknown";
  }
}
