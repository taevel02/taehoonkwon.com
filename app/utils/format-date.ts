import dayjs from "dayjs";

export function formatDate(date: string | Date) {
  try {
    return dayjs(new Date(date)).format("YYYY. M. D.");
  } catch {
    return "unknown";
  }
}
