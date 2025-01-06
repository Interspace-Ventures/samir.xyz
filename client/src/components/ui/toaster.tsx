"use client"

import * as React from "react";
import {
  Toast,
  ToastClose,
  ToastProvider,
  ToastViewport,
} from "../ui/toast";
import { useToast } from "../../hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, ...props }) => (
        <Toast key={id} {...props}>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}