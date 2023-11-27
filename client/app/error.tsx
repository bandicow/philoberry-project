"use client";

import ErrorPlaceholder from "@/src/components/Static/default-error";

interface ErrorPlaceholderProps {
  error: Error;
}

export default function Error({ error }: ErrorPlaceholderProps) {
  return <ErrorPlaceholder error={error} />;
}
