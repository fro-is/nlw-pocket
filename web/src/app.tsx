import { EmptyGoals } from "./components/empty-goals";
import { Summary } from "./components/summary";
import { Dialog } from "./components/ui/dialog";
import { CreateGoal } from "./components/create-goal";
import { useQuery } from "@tanstack/react-query";
import { fetchGoalsSummary } from "./services/api";

function App() {
	const { data: summary } = useQuery({
		queryFn: fetchGoalsSummary,
		queryKey: ["goals-summary"],
		staleTime: 1000 * 60,
	});

	return (
		<Dialog>
			{summary?.total && summary.total > 0 ? <Summary /> : <EmptyGoals />}
			<CreateGoal />
		</Dialog>
	);
}

export default App;
