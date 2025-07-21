import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ user, children, allowIncompleteProfile = true }) {
  const location = useLocation();

  // 🟡 Step 1: Still waiting for user data from App.jsx
  if (user === null) {
    console.log('⏳ ProtectedRoute: Waiting for user session...');
    return null; // Optional: return <div>Loading...</div>;
  }

  // 🔴 Step 2: No session → redirect to login
  if (!user?.email) {
    console.log('🔐 ProtectedRoute: No session. Redirecting to /login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🔶 Step 3: Session exists, but no profile and it's required → redirect to questionnaire
  if (!user.hasProfile && !allowIncompleteProfile) {
    console.log('📝 ProtectedRoute: No profile. Redirecting to /questionnaire');
    return <Navigate to="/questionnaire" state={{ from: location }} replace />;
  }

  // ✅ Step 4: Auth + profile ok → allow access
  console.log('✅ ProtectedRoute: Access granted to protected route');
  return children;
}
