import { Navigate } from "react-router-dom";
import { useStudentAuth } from "../context/StudentAuthProvider";
import { StudentPortalView } from "../views/student/StudentPortalView";
import { Spinner } from "../components/Spinner";

export function StudentGate() {
  const { student, token, loading } = useStudentAuth();

  if (loading || (token && !student)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  if (!student) {
    return <Navigate to="/alumno/login" replace />;
  }

  return <StudentPortalView />;
}
