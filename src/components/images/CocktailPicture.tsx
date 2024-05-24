import Image from "next/image";

export function CocktailPicture({ url }: { url: string }) {
  return (
    <Image
      priority={true}
      src={url}
      height={200}
      width={200}
      alt="dynamically loaded image"
      className="shadow-md"
    />
  );
}
export function SmallCocktailPicture({ url }: { url: string }) {
  return (
    <Image
      priority={true}
      src={url}
      height={100}
      width={100}
      alt="dynamically loaded image"
      className="shadow-md"
    />
  );
}
