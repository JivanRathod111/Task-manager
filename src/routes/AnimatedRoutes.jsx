import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "../pages/Login";
import SignUpForm from "../pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";


const pageVariants = {
  initial: { opacity: 0 },
in: { opacity: 1 },
out: { opacity: 0 }

  
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 1.8,
};

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <LoginForm />
            </motion.div>
          }
        />
        <Route
          path="/signup"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <SignUpForm />
            </motion.div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Dashboard />
              </motion.div>
            </PrivateRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
