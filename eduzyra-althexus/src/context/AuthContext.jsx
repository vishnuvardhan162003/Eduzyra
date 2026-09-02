import { createContext, useMemo, useState } from 'react'

export const AuthContext = createContext(null)

export const ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
}

// Mock authentication + enrollment state, kept in memory for this session.
// Swap login/signup/logout for real API calls (services/authService.js) once
// a backend exists — every consumer reads from this context, not from here
// directly, so the rest of the app does not need to change.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([])

  const login = async ({ email, role = ROLES.STUDENT }) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 400))
    setUser({ name: email.split('@')[0] || 'Learner', email, role })
    setLoading(false)
  }

  const signup = async ({ name, email, role = ROLES.STUDENT }) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 400))
    setUser({ name, email, role })
    setLoading(false)
  }

  const logout = () => {
    setUser(null)
    setEnrolledCourseIds([])
  }

  const enrollInCourse = (courseId) => {
    setEnrolledCourseIds((prev) => (prev.includes(courseId) ? prev : [...prev, courseId]))
  }

  const isEnrolledIn = (courseId) => enrolledCourseIds.includes(courseId)

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      signup,
      logout,
      isAuthenticated: Boolean(user),
      role: user?.role ?? null,
      enrolledCourseIds,
      enrollInCourse,
      isEnrolledIn,
    }),
    [user, loading, enrolledCourseIds, isEnrolledIn],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
