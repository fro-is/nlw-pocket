import { X } from "lucide-react";
import { Button } from "./ui/button";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
	RadioGroup,
	RadioGroupIndicator,
	RadioGroupItem,
} from "./ui/radio-group";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGoal } from "../services/api";
import { useQueryClient } from "@tanstack/react-query";

const createGoalForm = z.object({
	title: z.string().min(1, "Informe a atividade que deseja realizar"),
	desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

type CreateGoalForm = z.infer<typeof createGoalForm>;

export function CreateGoal() {
	const queryClient = useQueryClient();

	const { register, control, handleSubmit, formState, reset } =
		useForm<CreateGoalForm>({
			resolver: zodResolver(createGoalForm),
		});

	async function handleCreateGoal(data: CreateGoalForm) {
		await createGoal(data);

		queryClient.invalidateQueries({
			queryKey: ["goals-summary"],
		});
		queryClient.invalidateQueries({
			queryKey: ["pending-goals"],
		});

		reset();
	}

	return (
		<DialogContent>
			<div className="flex h-full flex-col gap-6">
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<DialogTitle>Cadastrar Meta</DialogTitle>
						<DialogClose>
							<X className="size-5 text-zinc-600" />
						</DialogClose>
					</div>

					<DialogDescription>
						Adicione atividades que <u>te fazem bem</u> e que você quer
						continuar praticando toda semana.
					</DialogDescription>
				</div>

				<form
					action=""
					onSubmit={handleSubmit(handleCreateGoal)}
					className="flex flex-1 flex-col justify-between"
				>
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<Label htmlFor="title">Qual a atividade?</Label>
							<Input
								id="title"
								placeholder="Praticar exercícios, meditar, etc..."
								autoFocus
								{...register("title")}
							/>

							{formState.errors.title && (
								<p className="text-red-400 text-sm">
									{formState.errors.title.message}
								</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="weeklyFrequency">Quantas vezes na semana?</Label>
							<Controller
								control={control}
								name="desiredWeeklyFrequency"
								defaultValue={3}
								render={({ field }) => {
									return (
										<RadioGroup
											onValueChange={field.onChange}
											value={String(field.value)}
										>
											<RadioGroupItem value="1">
												<RadioGroupIndicator />
												<span className="text-zinc-300 text-sm font-medium leading-none">
													1x na semana
												</span>
												<span className="text-lg leading-none">🥱</span>
											</RadioGroupItem>
											<RadioGroupItem value="2">
												<RadioGroupIndicator />
												<span className="text-zinc-300 text-sm font-medium leading-none">
													2x na semana
												</span>
												<span className="text-lg leading-none">🤨</span>
											</RadioGroupItem>
											<RadioGroupItem value="3">
												<RadioGroupIndicator />
												<span className="text-zinc-300 text-sm font-medium leading-none">
													3x na semana
												</span>
												<span className="text-lg leading-none">🙂</span>
											</RadioGroupItem>
										</RadioGroup>
									);
								}}
							/>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<DialogClose asChild>
							<Button type="button" variant="secondary" className="flex-1">
								Fechar
							</Button>
						</DialogClose>
						<Button className="flex-1">Salvar</Button>
					</div>
				</form>
			</div>
		</DialogContent>
	);
}
