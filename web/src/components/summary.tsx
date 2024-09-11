import { CheckCircle2, Plus } from 'lucide-react';
import { InOrbitIcon } from './icons/in-orbit-icon';
import { Button } from './ui/button';
import { DialogTrigger } from './ui/dialog';
import { OutlineButton } from './ui/outline-button';
import { Progress, ProgressIndicator } from './ui/progress-bar';
import { Separator } from './ui/separator';

export function Summary() {
  return (
    <div className="py-10 px-5 mx-auto max-w-[480px] h-screen flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold">5 a 10 de agosto</span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            <span>Cadastrar Meta</span>
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={10} max={15}>
          <ProgressIndicator style={{ width: '58%' }} />
        </Progress>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou <b className="text-zinc-100">8</b> de{' '}
            <b className="text-zinc-100">15</b> metas nessa semana.
          </span>
          <b className="text-zinc-100">58%</b>
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-3">
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          <span>Meditar</span>
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          <span>Nadar</span>
        </OutlineButton>
        <OutlineButton>
          <Plus className="size-4 text-zinc-600" />
          <span>Atoar</span>
        </OutlineButton>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua Semana</h2>
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">
            Domingo{' '}
            <span className="text-zinc-400 text-xs">(10 de agosto)</span>
          </h3>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou "<b className="text-zinc-100">Acordar Cedo</b>"
                às <b className="text-zinc-100">08:13</b>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou "<b className="text-zinc-100">Acordar Cedo</b>"
                às <b className="text-zinc-100">08:13</b>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou "<b className="text-zinc-100">Acordar Cedo</b>"
                às <b className="text-zinc-100">08:13</b>
              </span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">
            Segunda{' '}
            <span className="text-zinc-400 text-xs">(11 de agosto)</span>
          </h3>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-pink-500" />
              <span className="text-sm text-zinc-400">
                Você completou "<b className="text-zinc-100">Acordar Cedo</b>"
                às <b className="text-zinc-100">08:13</b>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
