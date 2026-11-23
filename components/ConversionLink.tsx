"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackConversion } from "@/lib/ads";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** "AW-.../label". Empty means the link works but nothing is sent. */
  sendTo: string;
};

/** A normal link that also reports one Google Ads conversion per click. Never blocks the link. */
export default function ConversionLink({ sendTo, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);
        trackConversion(sendTo);
      }}
    />
  );
}
