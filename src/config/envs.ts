import 'dotenv/config';
import { z } from 'zod';

interface EnvVars {
  PORT: number;
  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number;
  ORDERS_MICROSERVICE_HOST: string;
  ORDERS_MICROSERVICE_PORT: number;
}

const envsSchema = z
  .object({
    PORT: z.coerce.number(),
    PRODUCTS_MICROSERVICE_HOST: z.coerce.string(),
    PRODUCTS_MICROSERVICE_PORT: z.coerce.number(),
    ORDERS_MICROSERVICE_HOST: z.coerce.string(),
    ORDERS_MICROSERVICE_PORT: z.coerce.number()
  })
  .passthrough();

const envVars = envsSchema.parse(process.env);

export const envs: EnvVars = {
  ...envVars,
};
