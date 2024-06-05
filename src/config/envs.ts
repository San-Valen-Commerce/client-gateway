import 'dotenv/config';
import { z } from 'zod';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
}

const envsSchema = z
  .object({
    PORT: z.coerce.number(),
    NATS_SERVERS: z.array(z.coerce.string()),
  })
  .passthrough();

const envVars = envsSchema.parse({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

export const envs: EnvVars = {
  ...envVars,
};
