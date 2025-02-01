import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  description: z.string().min(1, 'Description is required'),
});
