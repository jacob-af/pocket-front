import Image from "next/image";

export function CardBorder() {
  return (
    <Image
      priority={true}
      // height={400}
      // width={400}
      fill={true}
      src={"/border-2.png"}
      alt="dynamically loaded image"
      className="shadow-md dark:invert"
    />
  );
}
