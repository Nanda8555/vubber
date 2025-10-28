import AuthenticatedLayout from "@/shared/layout/AuthenticatedLayout";
import { motion } from "framer-motion";

export default function Profile() {
  return (
    <AuthenticatedLayout>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto py-6">
          <h1 className="text-4xl font-bold text-white">Profile</h1>
        </div>
      </motion.div>
    </AuthenticatedLayout>
  );
} 