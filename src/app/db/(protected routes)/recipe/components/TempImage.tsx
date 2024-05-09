import Image from "next/image";

export default function TempImage() {
  return (
    <Image
      src="/withcherry200.png"
      width={180}
      height={180}
      alt="Pixel drawing of whiskey cocktail on the rocks with cherry"
      className="float-left mr-6"
    />
  );
}

export function SmallImage() {
  return (
    <Image
      src="/withcherry100.png"
      width={90}
      height={90}
      alt="Pixel drawing of whiskey cocktail on the rocks with cherry"
      className="float-left mr-6"
    />
  );
}
