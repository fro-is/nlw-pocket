import { Plus } from 'lucide-react';

import letsStart from './assets/lets-start.svg';
import logo from './assets/logo.png';
import { Button } from './components/ui/button';

function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="in.orbit" />
      <img src={letsStart} alt="in.orbit illustration" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal <u>cadastrar um</u> agora
        mesmo?
      </p>
      <Button>
        <Plus className="size-4" />
        <span>Cadastrar Meta</span>
      </Button>
    </div>
  );
}

export default App;
