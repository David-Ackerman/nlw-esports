import * as Select from "@radix-ui/react-select";
import { CaretDown } from "phosphor-react";
import { useState } from "react";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

interface GameSelectProps {
  data: Game[];
  onSelect: (value: string) => void;
}

export function GameSelect({ data, onSelect }: GameSelectProps) {
  return (
    <Select.Root onValueChange={onSelect}>
      <Select.Trigger className='bg-zinc-900 py-3 flex justify-between items-center px-4 rounded text-sm placeholder:text-zinc-500'>
        <Select.Value
          id='game'
          placeholder='Selecione o game que deseja jogar'
        />
        <Select.Icon>
          <CaretDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className='bg-zinc-800 rounded-lg border-[0.5px] p-2 border-zinc-600 text-white '>
          <Select.Viewport>
            {data.map((game) => (
              <Select.Item
                className='hover:bg-pink-400 rounded ease-in-out transition-colors px-2'
                key={game.id}
                value={game.id}
              >
                <Select.ItemText>{game.title}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
