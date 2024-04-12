const fs = require("fs");

interface TouchItem {
  unit: string;
  amount: number | string;
  ingredientName: string;
}

interface Build {
  buildName: string;
  glassware: string;
  ice: string;
  touchArray: TouchItem[];
  instructions: string;
}

interface Cocktail {
  name: string;
  about: string;
  build: Build;
}

function csvToCocktails(csvData: string): Cocktail[] {
  const lines = csvData.split("\n").map(line => line.trim());
  const cocktails: Cocktail[] = [];
  let currentCocktail: Partial<Cocktail> = {};
  let currentTouchArray: TouchItem[] = [];

  lines.forEach(line => {
    const values = line.split(",");
    if (values.length === 9) {
      // Assuming each line has 9 values
      if (!currentCocktail.name) {
        currentCocktail.name = values[0];
        currentCocktail.about = values[1];
        currentCocktail.build = {
          buildName: values[2],
          glassware: values[3],
          ice: values[4],
          touchArray: [],
          instructions: values[5]
        };
      } else {
        currentTouchArray.push({
          unit: values[6],
          amount: values[7],
          ingredientName: values[8]
        });
      }
    } else {
      cocktails.push({
        name: currentCocktail.name!,
        about: currentCocktail.about!,
        build: {
          buildName: currentCocktail.build!.buildName,
          glassware: currentCocktail.build!.glassware,
          ice: currentCocktail.build!.ice,
          touchArray: currentTouchArray,
          instructions: currentCocktail.build!.instructions
        }
      });
      currentCocktail = {};
      currentTouchArray = [];
    }
  });

  return cocktails;
}

function readCSVFromFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

// Example usage
const filePath = "./cocktails.csv";
const csvData = readCSVFromFile(filePath);
const cocktails = csvToCocktails(csvData);
console.log(cocktails);
