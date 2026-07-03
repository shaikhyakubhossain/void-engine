const DEFAULT_TIME_ZONE = "UTC";

export function getCurrentDateTime(timeZone?: string): string {

    const safeTimeZone = isValidTimeZone(timeZone)
    ? timeZone
    : DEFAULT_TIME_ZONE;

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: safeTimeZone,
  }).format(new Date());
}

function isValidTimeZone(timeZone?: string): boolean {
    if (!timeZone) return false;
    try {
        Intl.DateTimeFormat(undefined, {
            timeZone,
        });

        return true;
    } catch {
        return false;
    }
}