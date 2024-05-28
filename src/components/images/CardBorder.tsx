import Image from "next/image";

export function CardBorder() {
  return (
    <Image
      priority={true}
      // height={400}
      // width={400}
      fill={true}
      src={"/border-2.png"}
      alt="elegant border"
      className="dark:invert"
    />
  );
}

export function BreakPoint() {
  return (
    <Image
      priority={true}
      height={17}
      width={280}
      src={"/breakpoint.png"}
      alt="simple breakpoint"
      className="filter-primary dark:invert"
    />
  );
}
