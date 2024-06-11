import { ListItem } from "@/__generated__/graphql";

function levenshteinDistance(s1: string, s2: string) {
  const len1 = s1.length;
  const len2 = s2.length;

  const d = new Array(len1 + 1).fill(0).map(() => new Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) {
    d[i][0] = i;
  }
  for (let j = 0; j <= len2; j++) {
    d[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost
      );
    }
  }

  return d[len1][len2];
}

export default function levenshteinSortingAlgorithm(
  a: ListItem,
  b: ListItem,
  input: string
) {
  const distanceA = levenshteinDistance(
    a.name.toLowerCase(),
    input.toLowerCase()
  );
  const distanceB = levenshteinDistance(
    b.name.toLowerCase(),
    input.toLowerCase()
  );

  if (distanceA === distanceB) {
    return a.name.localeCompare(b.name);
  }

  return distanceA - distanceB;
}
