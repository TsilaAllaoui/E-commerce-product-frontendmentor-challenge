import Link from "next/link";

export const Panels = () => {
  const panels = ["Add", "Users"];

  return (
    <nav id="panels">
      {panels.map((panel) => (
        <Link href={"/admin/" + panel.toLowerCase()}>{panel}</Link>
      ))}
    </nav>
  );
};
