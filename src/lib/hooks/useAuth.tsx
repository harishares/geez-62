
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type User, type Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { type Profile } from '@/lib/types/auth'
import { toast } from 'sonner'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  isLoading: boolean
  signInWithEmail: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signUp: (email: string, password: string, userRole: 'student' | 'organization', fullName: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          setProfile(profile)
          
          // Redirect based on role
          if (profile?.user_role === 'student') {
            navigate('/student-dashboard')
          } else if (profile?.user_role === 'organization') {
            navigate('/org-dashboard')
          }
        } else {
          setProfile(null)
          navigate('/login')
        }
      }
    )

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profile }) => {
            setProfile(profile)
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/auth/callback'
        }
      })
      if (error) throw error
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const signUp = async (email: string, password: string, userRole: 'student' | 'organization', fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_role: userRole,
            full_name: fullName
          }
        }
      })
      if (error) throw error
      toast.success('Check your email to confirm your account')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('Logged out successfully')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      isLoading,
      signInWithEmail,
      signInWithGoogle,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
