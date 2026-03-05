"use client";

import dynamic from "next/dynamic";

const ReferralForm = dynamic(() => import("@/components/ReferralForm"), {
  ssr: false,
});

export default function ReferralFormLoader() {
  return <ReferralForm />;
}
