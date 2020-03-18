export function normalizers(): string {
  return 'normalizers'
}

/**
 * Convert string representation of date to Unix EPOCH Number
 *
 * Take yyyyMMddhhmmss formatted string, e.g. `20200317171243`,
 * make it an Unix EPOCH number.
 *
 * @example
 * // 2020-03-17 at 17:12:43 UTC
 * input: "20200317171243"
 * output: 1584479563000
 *
 * Bookmarks:
 * - https://en.wikipedia.org/wiki/ISO_8601#Truncated_representations
 */
export const yyyyMMddhhmmss = (
  input: string,
): number | null => {
  let out: number | null = null
  const assertions = [
    /^\d{14}$/ /* MUST be exclusively 14 digits */,
  ].map(r => r.test(input))

  let hopefullyParseable = ''
  // At least 2 digits number string
  const s = (n: number): string => String(n).padStart(2, '0')
  if (assertions.includes(false) === false && typeof input === 'string') {
    const yyyy = Number(input.substr(0, 4))
    const mm = Number(input.substr(4, 2))
    const dd = Number(input.substr(6, 2))
    const hh = Number(input.substr(8, 2))
    const mn = Number(input.substr(10, 2))
    const ss = Number(input.substr(12, 2))
    // Always UTC!
    hopefullyParseable = `${yyyy}-${s(mm)}-${s(dd)}T${s(hh)}:${s(
      mn,
    )}:${s(ss)}`
    const attempt = new Date(hopefullyParseable)
    const maybeNumber = +attempt
    if (Number.isNaN(maybeNumber) === false) {
      out = maybeNumber
    }
  }

  return out
}
