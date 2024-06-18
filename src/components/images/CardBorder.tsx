import Image from "next/image";

export function CardBorder() {
  return (
    <Image
      priority={true}
      // height={400}
      // width={400}
      fill={true}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      src={"/border-2.png"}
      alt="elegant border"
      className="dark:invert"
    />
  );
}

export function BookBorder() {
  return (
    <Image
      priority={true}
      // height={270}
      // width={196}
      fill={true}
      sizes="(max-width: 768px) 100vw, 50vw"
      src={"/BookBorder.png"}
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
      className="filter-primary invert dark:invert-0"
    />
  );
}
