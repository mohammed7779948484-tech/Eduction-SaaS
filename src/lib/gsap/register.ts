"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Register the React integration plugin once. Safe to call multiple times.
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export { gsap, useGSAP };
