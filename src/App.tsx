import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./presentation/context/AuthProvider";
import { StudentAuthProvider } from "./presentation/context/StudentAuthProvider";
import { LandingView } from "./presentation/views/landing/LandingView";
import { AdminLoginView } from "./presentation/views/admin/AdminLoginView";
import { AdminGate } from "./presentation/router/AdminGate";
import { StudentLoginView } from "./presentation/views/student/StudentLoginView";
import { StudentGate } from "./presentation/router/StudentGate";

export default function App() {
  return (
    <AuthProvider>
      <StudentAuthProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route path="/" element={<LandingView />} />
            <Route path="/alumno/login" element={<StudentLoginView />} />
            <Route path="/alumno" element={<StudentGate />} />
            <Route path="/admin/login" element={<AdminLoginView />} />
            <Route path="/admin" element={<AdminGate />} />
          </Routes>
        </BrowserRouter>
      </StudentAuthProvider>
    </AuthProvider>
  );
}
