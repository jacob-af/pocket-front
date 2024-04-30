import Image from "next/image";

export default function TempImage() {
  return (
    <Image
      src="/withcherry200.png"
      width={200}
      height={200}
      alt="Pixel drawing of whiskey cocktail on the rocks with cherry"
      className="float-left"
    />
  );
}
