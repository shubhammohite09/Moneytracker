// Group transactions by person and compute totals.
export function groupByPerson(transactions) {
  const map = {};
  transactions.forEach((tx) => {
    const key = (tx.person || '').trim().toLowerCase();
    if (!map[key]) {
      map[key] = {
        key,
        person: tx.person,
        personEn: tx.personEn || '',
        total: 0,
        count: 0,
        returnedCount: 0,
      };
    }
    map[key].total += tx.amount;
    map[key].count += 1;
    if (tx.returned) map[key].returnedCount += 1;
    if (tx.personEn && !map[key].personEn) map[key].personEn = tx.personEn;
  });
  return Object.values(map);
}

export const formatRupees = (n) => '₹ ' + Number(n).toLocaleString('en-IN');

export const initialOf = (name) => (name || '?').trim().charAt(0).toUpperCase();
