import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import { toast } from "@/components/ui/sonner";
import "./index.css";

const updateSW = registerSW({
  onNeedRefresh() {
    toast("Update available.", {
      action: {
        label: "Reload",
        onClick: () => updateSW(true),
      },
      duration: Infinity,
    });
  },
  onOfflineReady() {
    toast("All content is ready for offline use.");
  },
});

createRoot(document.getElementById("root")!).render(<App />);
