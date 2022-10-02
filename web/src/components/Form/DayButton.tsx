import * as ToggleGroup from "@radix-ui/react-toggle-group";

interface DayButtonProps {
  children: React.ReactNode;
  value: string;
  selected: boolean;
  title: string;
}

export function DayButton({
  children,
  value,
  selected,
  title,
}: DayButtonProps) {
  return (
    <ToggleGroup.Item
      value={value}
      title={title}
      className={`w-9 h-9 rounded  ${
        selected ? "bg-violet-500" : "bg-zinc-900"
      } `}
    >
      {children}
    </ToggleGroup.Item>
  );
}
