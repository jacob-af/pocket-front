import { ChangeEvent, useEffect, useState } from "react";
import { ListItem, Unit } from "@/__generated__/graphql";
import { newRecipeInfo, selectedRecipe } from "@/graphql/reactiveVar/recipes";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";

import { ALL_INGREDIENTS } from "@/graphql/queries/ingredient";
import { CREATE_STOCK } from "@/graphql/mutations/inventory";
import IngredientDrop from "../ingredients/IngredientSelect";
import LoadIngredients from "../ingredients/IngredientLoader";
import LoadInventories from "../inventory/InventoryLoader";
import MuiDropDown from "../SharedComponents/MUIDropDown";
import RecipeLoader from "../recipe/UserRecipeLoader";
import { UNIT_TYPES } from "@/graphql/queries/unit";
import UnitSelector from "../recipe/input/UnitSelector";
import { alertList } from "@/graphql/reactiveVar/alert";
import { allIngredientsList } from "@/graphql/reactiveVar/ingredients";
import { fieldChange } from "@/components/recipe/recipeActions";
import { selectedInventory } from "@/graphql/reactiveVar/inventory";
import { unitList } from "@/graphql/reactiveVar/unit";

export const AddStockModal = ({
  open,
  toggleopen
}: {
  open: boolean;
  toggleopen: () => void;
}) => {
  const ingredients = useReactiveVar(allIngredientsList);
  const list = useReactiveVar(unitList);
  const alerts = useReactiveVar(alertList);
  const recipe = useReactiveVar(selectedRecipe);
  const inventory = useReactiveVar(selectedInventory);

  const [ingredient, setIngredient] = useState<ListItem>({ id: "", name: "" });
  const [unit, setUnit] = useState<Unit>({ id: "unitId", abbreviation: "" });
  const [amount, setAmount] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [stockData, setStockData] = useState({
    ingredient: { id: "", name: "" },
    unit: { id: "", abbreviation: "ml" },
    amount: 0,
    price: 0
  });
  const [createStock] = useMutation(CREATE_STOCK, {
    refetchQueries: [ALL_INGREDIENTS]
  });

  const { data: ingredientList } = useQuery(ALL_INGREDIENTS, {
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    if (ingredientList) {
      allIngredientsList(ingredientList.ingredients as ListItem[]);
    }
  }, [ingredientList]);

  const closeModal = () => {
    fieldChange({ key: "about", newValue: "" });
    toggleopen();
  };

  const stockChange = (value: ListItem) => {
    setStockData({
      ...stockData,
      ingredient: value
    });
  };
  const unitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedUnit = list.find(u => u.abbreviation === event.target.value);
    if (selectedUnit) {
      setStockData({
        ...stockData,
        unit: selectedUnit
      });
    }
  };
  const amountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStockData({
      ...stockData,
      amount: Number(event.target.value)
    });
  };

  const priceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStockData({
      ...stockData,
      price: Number(event.target.value)
    });
  };

  const onClick = async () => {
    try {
      console.log(stockData, inventory.id);
      const res = await createStock({
        variables: {
          inventoryId: inventory.id,
          createStock: {
            ingredientName: stockData.ingredient.name,
            unitAbb: stockData.unit.abbreviation,
            amount: stockData.amount,
            price: stockData.price
          }
        }
      });
      console.log(res);
      alertList([
        ...alerts,
        {
          code: "success",
          message: `${stockData.ingredient.name} has been added to ${inventory.name}`
        }
      ]);
      setStockData({
        ingredient: { id: "", name: "" },
        unit: { id: "", abbreviation: "" },
        amount: 0,
        price: 0
      });
      toggleopen();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      alertList([
        ...alerts,
        {
          code: "error",
          message: errorMessage
        }
      ]);
      console.log(error);
    }
  };

  return (
    <div>
      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={closeModal} // Close modal when clicking outside of the modal content
        >
          <div
            className="bg-contrast relative w-80 rounded border-2 p-6 shadow-lg"
            onClick={e => e.stopPropagation()} // Prevent modal from closing when clicking inside modal
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute right-2 top-2 text-gray-100 hover:text-gray-800"
            >
              &times;
            </button>

            {/* Modal content */}
            <div className="text-primary mb-4 text-lg">
              Add Ingredient to Inventory
            </div>

            {/* Input fields */}
            <div className="flex flex-col">
              <label className="mb-2">Ingredient:</label>
              <MuiDropDown
                options={ingredients as ListItem[]}
                handleChange={value => stockChange(value)}
                index={55}
                currentValue={stockData.ingredient}
              />
              <div className="flex flex-row">
                <label className="mb-2">Amount:</label>
                <input
                  className="focus:shadow-outline bg-contrast mb-2 flex-none text-center shadow"
                  onChange={amountChange}
                  type="number"
                  id="amount"
                  value={stockData.amount}
                />
              </div>
              <div className="flex flex-row">
                <label className="mb-2">Unit:</label>
                <select
                  onChange={unitChange}
                  name="unit-options"
                  className="focus:shadow-outline bg-contrast mb-2 w-auto flex-none text-white"
                  id="unit"
                  value={stockData.unit.abbreviation}
                >
                  {list.map((unit, index) => (
                    <option
                      key={unit.abbreviation + index}
                      value={unit.abbreviation}
                    >
                      {unit.abbreviation}
                    </option>
                  ))}
                </select>
                <UnitSelector />
              </div>
              <div className="flex flex-row">
                <label className="mb-2">Price (USD):</label>
                <input
                  className="focus:shadow-outline bg-contrast mb-2 w-auto flex-none text-center shadow"
                  onChange={priceChange}
                  type="number"
                  id="price"
                  value={stockData.price}
                />
              </div>
              <button
                className="rounded bg-blue-500 px-4 py-2 text-white"
                onClick={onClick}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
