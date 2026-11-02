"use client";

import * as React from "react";
import { LangContext } from "@/components/site/Lang";
import { HOME_COPY, type HomeCopy } from "@/components/site/homeCopy";

/** Homepage prose for the active language, falling back to English. */
export function useHomeCopy(): HomeCopy {
  const lang = React.useContext(LangContext);
  return HOME_COPY[lang] ?? HOME_COPY.en;
}
