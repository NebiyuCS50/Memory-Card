import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Homepage from "./Homepage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SpeedInsights projectId="your-project-id">
      <Homepage />
    </SpeedInsights>
  </StrictMode>
);
