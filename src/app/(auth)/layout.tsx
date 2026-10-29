import React from "react";

// (auth) Route Group Layout: Auth pages ka wrapper layout
export default function AuthRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
