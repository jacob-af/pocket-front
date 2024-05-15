import Image from "next/image";

export function BookCoverImage() {
  return (
    <Image
      src="/CocktailSpread.png"
      height={160}
      width={384}
      alt="various cocktails on a marble bar top"
      className="shadow-md"
    />
  );
}
