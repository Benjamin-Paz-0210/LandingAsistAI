import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import { AdminDashboardView } from "../views/admin/AdminDashboardView";
import { Alert } from "../components/Alert";
import { Spinner } from "../components/Spinner";

export function AdminGate() {
  const { session, loading, error } = useAuthContext();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory text-navy-900">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  if (error && !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
        <div className="w-full max-w-md space-y-4 rounded-2xl bg-ivory p-6">
          <Alert tone="error">{error}</Alert>
          <Link to="/admin/login" className="inline-block text-sm text-navy-700 hover:text-gold-dark">
            Ir al inicio de sesión
          </Link>
        </div>
      </main>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminDashboardView />;
}
