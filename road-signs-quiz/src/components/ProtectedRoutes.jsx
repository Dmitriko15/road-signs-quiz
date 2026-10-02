/* This component guards routes that require a logged-in user —
   currently intended for /account and /exam.

   If no user is logged in, it redirects to /login instead of rendering
   the protected page at all.
*/

import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

/* ----------------------- PROTECTED ROUTE ----------------------- */

export function ProtectedRoute({ children }) {
  // pulls the current logged-in user (or null) from AuthContext,
  // via the useAuth() hook built in AuthContext.jsx
  const { user } = useAuth()

  // WHY: if there's no logged-in user, Navigate acts like React Router's
  //      programmatic version of useNavigate() from Module 3 — but as a
  //      COMPONENT you can return directly from a render, rather than a
  //      function you call inside an event handler
  // WHAT: 'replace' means this redirect doesn't add a new entry to browser
  //       history — so clicking the browser's Back button won't bounce the
  //       user back to the protected page they were just blocked from
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}