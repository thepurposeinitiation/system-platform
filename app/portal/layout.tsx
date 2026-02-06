import React from "react";
import { FieldProvider } from "@/components/providers/field-provider";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FieldProvider>{children}</FieldProvider>;
}
