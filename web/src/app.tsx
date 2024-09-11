import { EmptyGoals } from './components/empty-goals';
import { Summary } from './components/summary';
import { Dialog } from './components/ui/dialog';

function App() {
  const emptyGoals = false;

  return <Dialog>{emptyGoals ? <EmptyGoals /> : <Summary />}</Dialog>;
}

export default App;
