import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { timezoneCreatedAt } from './constants';

export const goals = pgTable('goals', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
  createdAt: timezoneCreatedAt(),
});

export const goalCompletions = pgTable('goal_completions', {
  id: serial('id').primaryKey(),
  goalId: integer('goal_id')
    .references(() => goals.id)
    .notNull(),
  createdAt: timezoneCreatedAt(),
});
