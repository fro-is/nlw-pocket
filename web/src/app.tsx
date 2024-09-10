import { Plus } from 'lucide-react';

import letsStart from './assets/lets-start.svg';
import logo from './assets/logo.png';

function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="in.orbit" />
      <img src={letsStart} alt="in.orbit illustration" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal <u>cadastrar um</u> agora
        mesmo?
      </p>
      <button
        type="button"
        className="px-4 py-2.5 rounded-lg bg-violet-500 text-violet-50 flex items-center gap-2 text-sm font-medium tracking-tight hover:bg-violet-600 transition-colors"
      >
        <Plus className="size-4" />
        <span>Cadastrar Meta</span>
      </button>
    </div>
  );
}

export default App;
