import { motion } from "framer-motion";

export default function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] w-full gap-4 text-primary">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full"
      />
      {text && <span className="text-sm font-medium text-slate animate-pulse">{text}</span>}
    </div>
  );
}
