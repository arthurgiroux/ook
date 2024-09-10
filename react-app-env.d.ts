// This is fixing an issue between Material Tailwind and @types/react >= v18.2.20
// See: https://github.com/creativetimofficial/material-tailwind/issues/528

import React from "react";

declare module "react" {
  interface HTMLAttributes {
    placeholder?: string;
    onPointerEnterCapture?: React.PointerEventHandler;
    onPointerLeaveCapture?: React.PointerEventHandler;
  }
}
