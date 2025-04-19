
import { type User } from '@supabase/supabase-js'

export type UserRole = 'student' | 'organization'

export interface Profile {
  id: string
  user_role: UserRole
  full_name: string | null
  university?: string
  course?: string
  study_year?: number
  skills?: string[]
  org_name?: string
  website?: string
  industry?: string
  description?: string
  avatar_url?: string
}

export interface AuthState {
  user: User | null
  profile: Profile | null
  isLoading: boolean
}
