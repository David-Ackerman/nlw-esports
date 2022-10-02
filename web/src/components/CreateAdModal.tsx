import { FormEvent, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from "axios";
import { Check, GameController } from "phosphor-react";
import { DayButton } from "./Form/DayButton";
import { Input } from "./Form/Input";
import { TimeInput } from "./Form/TimeInput";
import { GameSelect } from "./Form/GameSelect";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}
export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [weekDays, setWeekDays] = useState<string[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
    setGames([]);
    setSelectedGame("");
    setWeekDays([]);
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      axios.post(`http://localhost:3333/games/${selectedGame}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel,
      });
      alert("Anúncio criado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar o anúncio!");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed flex justify-center items-center'>
        <Dialog.Content className='bg-[#2a2634] py-8 px-10 text-white rounded-lg w-[500px] shadow-lg shadow-black/25 '>
          <Dialog.Title className='text-3xl font-black'>
            Publique um anúncio
          </Dialog.Title>
          <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='game' className='font-semibold'>
                Qual o game?
              </label>

              <GameSelect onSelect={setSelectedGame} data={games} />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='name'>Seu nome (ou nickname)</label>
              <Input
                name='name'
                required
                id='name'
                placeholder='Como te chamam dentro do game'
              />
            </div>

            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
                <Input
                  required
                  name='yearsPlaying'
                  id='yearsPlaying'
                  type='number'
                  placeholder='Tudo bem ser ZERO'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='discord'>Qaul seu Discord?</label>
                <Input
                  required
                  name='discord'
                  id='discord'
                  type='text'
                  placeholder='Usuario#0000'
                />
              </div>
            </div>

            <div className='flex gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='weekDays'>Quando costuma jogar</label>

                <ToggleGroup.Root
                  value={weekDays}
                  onValueChange={setWeekDays}
                  className='grid grid-cols-5 gap-2'
                  type='multiple'
                >
                  <DayButton
                    value='0'
                    selected={weekDays.includes("0")}
                    title='Domingo'
                  >
                    D
                  </DayButton>
                  <DayButton
                    value='1'
                    selected={weekDays.includes("1")}
                    title='Segunda'
                  >
                    S
                  </DayButton>
                  <DayButton
                    value='2'
                    selected={weekDays.includes("2")}
                    title='Terça'
                  >
                    T
                  </DayButton>
                  <DayButton
                    value='3'
                    selected={weekDays.includes("3")}
                    title='Quarta'
                  >
                    Q
                  </DayButton>
                  <DayButton
                    value='4'
                    selected={weekDays.includes("4")}
                    title='Quinta'
                  >
                    Q
                  </DayButton>
                  <DayButton
                    value='5'
                    selected={weekDays.includes("5")}
                    title='Sexta'
                  >
                    S
                  </DayButton>
                  <DayButton
                    value='6'
                    selected={weekDays.includes("6")}
                    title='Sábado'
                  >
                    S
                  </DayButton>
                </ToggleGroup.Root>
              </div>
              <div className='flex flex-col gap-2 flex-1'>
                <label htmlFor='hourStart'>Qual horário do dia?</label>
                <div className='grid grid-cols-2 gap-2'>
                  <TimeInput
                    name='hourStart'
                    required
                    id='hourStart'
                    type='time'
                    placeholder='De'
                  />
                  <TimeInput
                    required
                    name='hourEnd'
                    id='hourEnd'
                    type='time'
                    placeholder='Até'
                  />
                </div>
              </div>
            </div>

            <label className='mt-2 flex items-center gap-2 text-sm'>
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={(checked) =>
                  setUseVoiceChannel(checked === true)
                }
                className='w-6 h-6 p-1 rounded bg-zinc-900'
              >
                <Checkbox.Indicator>
                  <Check className='w-4 h-4 text-emerald-400' />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className='mt-4 flex justify-end gap-4'>
              <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                Cancelar
              </Dialog.Close>
              <button
                className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
                type='submit'
              >
                <GameController className='w-6 h-6' /> Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
