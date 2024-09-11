import { Plus } from 'lucide-react';

import letsStart from '../assets/lets-start.svg';
import logo from '../assets/logo.png';
import { CreateGoal } from './create-goal';
import { Button } from './ui/button';
import { DialogTrigger } from './ui/dialog';

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="in.orbit" />
      <img src={letsStart} alt="in.orbit illustration" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadasasdasdadtrou nenhuma meta, que tal{' '}
        <u>cadastrar um</u> agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          <span>Cadastrar Meta</span>
        </Button>
      </DialogTrigger>

      <CreateGoal />
    </div>
  );
}
