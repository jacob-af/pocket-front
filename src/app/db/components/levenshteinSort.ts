export default function sortByLevenshteinDistance(
  objects: { name: string; description: string; id: string }[],
  query: string
) {
  query = query.toLowerCase();
  return objects.sort((obj1, obj2) => {
    const name1 = obj1.name.toLowerCase();
    const name2 = obj2.name.toLowerCase();

    // Calculate the matching score for each name
    const score1: number = computeMatchingScore(name1, query);
    const score2: number = computeMatchingScore(name2, query);

    // Sort by the matching score in descending order
    return score2 - score1;
  });
}

function computeMatchingScore(name: string, query: string): number {
  let score = 0;

  // Check if the name contains the query as a substring
  if (name.includes(query)) {
    score += 100;
  }

  // Count the number of matching characters in the beginning of the name
  let index = 0;
  while (index < query.length && name[index] === query[index]) {
    index++;
  }
  score += index * 10;

  // Give a bonus for matching the first character
  if (index > 0) {
    score += 5;
  }

  return score;
}
