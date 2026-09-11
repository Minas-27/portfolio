/* Gregorian → Ethiopian date conversion.

   The same problem ethio_dev_kit's ethio_calendar package solves, done
   here in ~20 lines so the site itself demonstrates it rather than just
   claiming it. Julian Day Number is used as the bridge because the two
   calendars have different month lengths and leap rules.

   Verified: 11 Sep 2026 → Meskerem 1, 2019 (Ethiopian New Year). */

const JD_EPOCH_OFFSET_AMETE_MIHRET = 1723856;

export const ETHIOPIAN_MONTHS = [
  'መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት',
  'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜን',
];

export const ETHIOPIAN_MONTHS_LATIN = [
  'Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yekatit',
  'Megabit', 'Miazia', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagumen',
];

function gregorianToJDN(year, month, day) {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

export function toEthiopian(date = new Date()) {
  const jdn = gregorianToJDN(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const offset = jdn - JD_EPOCH_OFFSET_AMETE_MIHRET;
  const r = ((offset % 1461) + 1461) % 1461;
  const n = (r % 365) + 365 * Math.floor(r / 1460);

  return {
    year: 4 * Math.floor(offset / 1461) + Math.floor(r / 365) - Math.floor(r / 1460),
    month: Math.floor(n / 30) + 1,
    day: (n % 30) + 1,
  };
}

export function formatEthiopian(date = new Date(), { latin = false } = {}) {
  const { year, month, day } = toEthiopian(date);
  const names = latin ? ETHIOPIAN_MONTHS_LATIN : ETHIOPIAN_MONTHS;
  return `${names[month - 1]} ${day}, ${year}`;
}
