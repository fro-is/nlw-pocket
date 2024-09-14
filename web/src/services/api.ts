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

type CreateGoalRequest = {
  title: string;
  desiredWeeklyFrequency: number;
};

export const fetchGoalsSummary = async (): Promise<GoalsSummary> => {
  const response = await fetch('http://localhost:3333/goals/summary');
  const { data } = await response.json();

  return data.summary;
};

export const getPendingGoals = async (): Promise<Goal[]> => {
  const response = await fetch('http://localhost:3333/goals/pending');
  const { data } = await response.json();

  return data;
};

export const createGoalCompletion = async (goalId: string) => {
  await fetch('http://localhost:3333/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalId,
    }),
  });
};

export const createGoal = async ({ title, desiredWeeklyFrequency }: CreateGoalRequest) => {
  await fetch('http://localhost:3333/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
    }),
  });
};

export const deleteGoalCompletion = async (goalCompletionId: string) => {
  await fetch(`http://localhost:3333/completions/${goalCompletionId}`, {
    method: 'DELETE',
  });
};
