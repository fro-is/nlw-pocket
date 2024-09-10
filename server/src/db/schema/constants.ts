import { timestamp } from 'drizzle-orm/pg-core';

export const timezoneCreatedAt = () =>
  timestamp('created_at', { withTimezone: true }).notNull().defaultNow();
