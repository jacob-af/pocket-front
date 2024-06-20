import AuthButton from "@/components/buttons/SignOutButton";
import { BreakPoint } from "@/components/images/CardBorder";
import Details from "./views/Details";
import Ingredient from "./views/Ingredients";
import Link from "next/link";
import Recipe from "./views/Recipe";
import Welcome from "./views/Welcome";
export default function Home() {
  return (
    <>
      <Welcome />
      <Recipe />
      <Ingredient />
      <Details />
    </>
  );
}
