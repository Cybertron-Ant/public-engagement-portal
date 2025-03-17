import { z } from 'zod'

const envSchema = z.object({
  VITE_NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  VITE_API_URL: z.string().url().optional(),
  VITE_APP_VERSION: z.string().optional(),
  // Clerk config
  VITE_CLERK_PUBLISHABLE_KEY: z.string(),
  // Firebase config
  VITE_FIREBASE_API_KEY: z.string(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string(),
  VITE_FIREBASE_DATABASE_URL: z.string().url(),
  VITE_FIREBASE_PROJECT_ID: z.string(),
  VITE_FIREBASE_STORAGE_BUCKET: z.string(),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string(),
  VITE_FIREBASE_APP_ID: z.string(),
})

type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
  const env = {
    VITE_NODE_ENV: import.meta.env.VITE_NODE_ENV,
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_APP_VERSION: import.meta.env.VITE_APP_VERSION,
    // Clerk config
    VITE_CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    // Firebase config
    VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
    VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    VITE_FIREBASE_DATABASE_URL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
  }

  try {
    return envSchema.parse(env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map(issue => issue.path.join('.'))
      throw new Error(`❌ Invalid environment variables: ${missingVars.join(', ')}`)
    }
    throw error
  }
}

export const env = validateEnv()

// Type-safe environment helpers
export const isDevelopment = env.VITE_NODE_ENV === 'development'
export const isProduction = env.VITE_NODE_ENV === 'production'
export const isTest = env.VITE_NODE_ENV === 'test'
