import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { getPendingGoals } from "../services/api";
import { useQuery } from "@tanstack/react-query";

export function PendingGoals() {
	const { data: goals } = useQuery({
		queryFn: getPendingGoals,
		queryKey: ["pending-goals"],
		staleTime: 1000 * 60,
	});

	const handleGoal = (goalId: string) => {
		console.log(goalId);
	};

	if (!goals) {
		return "Semana completa!";
	}

	return (
		<div className="flex flex-wrap gap-3">
			{goals.map((goal) => {
				const goalCompleted =
					goal.completionCount >= goal.desiredWeeklyFrequency;

				return (
					<OutlineButton
						key={goal.id}
						onClick={() => handleGoal(goal.id)}
						disabled={goalCompleted}
					>
						<Plus className="size-4 text-zinc-600" />
						<span>{goal.title}</span>
					</OutlineButton>
				);
			})}
		</div>
	);
}
