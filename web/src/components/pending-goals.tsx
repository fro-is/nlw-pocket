import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { createGoalCompletion, getPendingGoals } from "../services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function PendingGoals() {
	const queryClient = useQueryClient();

	const { data: goals } = useQuery({
		queryFn: getPendingGoals,
		queryKey: ["pending-goals"],
		staleTime: 1000 * 60,
	});

	const handleGoalCompletion = async (goalId: string) => {
		await createGoalCompletion(goalId);

		queryClient.invalidateQueries({
			queryKey: ["goals-summary"],
		});
		queryClient.invalidateQueries({
			queryKey: ["pending-goals"],
		});
	};

	if (!goals) {
		return null;
	}

	return (
		<div className="flex flex-wrap gap-3">
			{goals.map((goal) => {
				const goalCompleted =
					goal.completionCount >= goal.desiredWeeklyFrequency;

				return (
					<OutlineButton
						key={goal.id}
						disabled={goalCompleted}
						onClick={() => handleGoalCompletion(goal.id)}
					>
						<Plus className="size-4 text-zinc-600" />
						<span>{goal.title}</span>
					</OutlineButton>
				);
			})}
		</div>
	);
}
