import AuthButton from "@/components/buttons/SignOutButton";
import { BreakPoint } from "@/components/images/CardBorder";
import Details from "../../../components/welcome/Details";
import Ingredient from "../../../components/welcome/Ingredients";
import Link from "next/link";
import Recipe from "../../../components/welcome/Recipe";
import Welcome from "../../../components/welcome/Welcome";
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
