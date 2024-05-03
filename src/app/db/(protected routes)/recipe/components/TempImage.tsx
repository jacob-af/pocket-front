import Image from "next/image";

export default function TempImage() {
  return (
    <Image
      src="/withcherry200.png"
      width={180}
      height={180}
      alt="Pixel drawing of whiskey cocktail on the rocks with cherry"
      className="float-left mr-6 [image-rendering:_pixelated]"
    />
  );
}
