type GoalsSummary = {
	completed: number;
	total: number;
	goalsPerDay: Record<
		string,
		{
			id: string;
			title: string;
			completedAt: string;
		}[]
	>;
};

type Goal = {
	id: string;
	title: string;
	desiredWeeklyFrequency: number;
	completionCount: number;
};

export const fetchGoalsSummary = async (): Promise<GoalsSummary> => {
	const response = await fetch("http://localhost:3333/goals/summary");
	const { data } = await response.json();

	return data.summary;
};

export const getPendingGoals = async (): Promise<Goal[]> => {
	const response = await fetch("http://localhost:3333/goals/pending");
	const { data } = await response.json();

	return data;
};
