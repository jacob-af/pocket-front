//const fs = require("fs");

function cocktailToCSV(cocktails: Cocktail[]): string {
  let csv =
    "Name,About,Build Name,Glassware,Ice,Instructions,Touch Unit,Touch Amount,Ingredient\n";

  cocktails.forEach(cocktail => {
    csv += `${cocktail.name},"${cocktail.about}",${cocktail.build.buildName},${cocktail.build.glassware},${cocktail.build.ice},"${cocktail.build.instructions}",,,\n`;
    cocktail.build.touchArray.forEach(touchItem => {
      csv += `,,,,,${touchItem.unit},${touchItem.amount},${touchItem.ingredientName}\n`;
    });
  });

  return csv;
}

function saveCSVToFile(csvData: string, filePath: string): void {
  fs.writeFileSync(filePath, csvData, "utf8");
  console.log(`CSV data has been saved to ${filePath}`);
}

// Example usage
const cocktails: Cocktail[] = [
  {
    name: "Espresso Martini",
    about:
      "The Espresso Martini is a modern classic cocktail made with vodka, coffee liqueur, sugar syrup, and a shot of espresso. It's a rich and indulgent drink with a strong coffee flavor and a hint of sweetness. The Espresso Martini is perfect for coffee lovers who enjoy a boozy twist.",
    build: {
      buildName: "IBA",
      glassware: "Martini",
      ice: "None",
      touchArray: [
        { unit: "cl", amount: 5, ingredientName: "Vodka" },
        { unit: "cl", amount: 1, ingredientName: "Coffee Liqueur" },
        {
          unit: "special",
          amount: "according to individual preference",
          ingredientName: "Sugar Syrup"
        },
        { unit: "each", amount: 1, ingredientName: "Short Strong Espresso" }
      ],
      instructions: "Shake and strain into a chilled cocktail glass."
    }
  }
];

const csvData = cocktailToCSV(cocktails);
const filePath = "cocktails.csv";
saveCSVToFile(csvData, filePath);
