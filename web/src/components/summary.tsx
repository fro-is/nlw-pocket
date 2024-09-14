import { CheckCircle2, Plus } from "lucide-react";
import { InOrbitIcon } from "./icons/in-orbit-icon";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { useQuery } from "@tanstack/react-query";
import { fetchGoalsSummary } from "../services/api";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { PendingGoals } from "./pending-goals";

dayjs.locale(ptBR);

export function Summary() {
	const { data: summary, isLoading } = useQuery({
		queryFn: fetchGoalsSummary,
		queryKey: ["goals-summary"],
		staleTime: 1000 * 60,
	});

	if (isLoading) {
		return "Loading";
	}

	if (!summary) {
		return "Sem dados";
	}

	const firstDayOfWeek = dayjs().startOf("week").format("DD MMM");
	const lastDayOfWeek = dayjs().endOf("week").format("DD MMM");

	const completedPercentage = Math.round(
		(summary.completed / summary.total) * 100,
	);

	return (
		<div className="py-10 px-5 mx-auto max-w-[480px] h-screen flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<InOrbitIcon />
					<span className="text-lg font-semibold capitalize">
						{firstDayOfWeek} - {lastDayOfWeek}
					</span>
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
					<ProgressIndicator style={{ width: `${completedPercentage}%` }} />
				</Progress>
				<div className="flex items-center justify-between text-xs text-zinc-400">
					<span>
						Você completou <b className="text-zinc-100">{summary.completed}</b>{" "}
						de <b className="text-zinc-100">{summary.total}</b> metas nessa
						semana.
					</span>
					<b className="text-zinc-100">{completedPercentage}%</b>
				</div>
			</div>

			<Separator />

			<PendingGoals />

			<div className="flex flex-col gap-6">
				<h2 className="text-xl font-medium">Sua Semana</h2>
				{Object.entries(summary.goalsPerDay).map(([date, goals]) => {
					const weekDay = dayjs(date).format("dddd");
					const formattedDate = dayjs(date).format("DD [de] MMMM");

					return (
						<div key={date} className="flex flex-col gap-4">
							<h3 className="font-medium">
								<span className="capitalize">{weekDay} </span>
								<span className="text-zinc-400 text-xs">({formattedDate})</span>
							</h3>

							<ul className="flex flex-col gap-3 transition-all">
								{goals.map((goal) => {
									const goalTime = dayjs(goal.completedAt).format("HH:mm");

									return (
										<li key={goal.id} className="flex items-center gap-2">
											<CheckCircle2 className="size-4 text-pink-500" />
											<span className="text-sm text-zinc-400">
												Você completou "
												<b className="text-zinc-100">{goal.title}</b>" às{" "}
												<b className="text-zinc-100">{goalTime}</b>
											</span>
										</li>
									);
								})}
							</ul>
						</div>
					);
				})}
			</div>
		</div>
	);
}
