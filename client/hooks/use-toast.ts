import { atom, useAtom } from 'jotai';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  type?: 'default' | 'success' | 'error' | 'warning';
}

const toastAtom = atom<Toast[]>([]);

export function useToast() {
  const [toasts, setToasts] = useAtom(toastAtom);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    setToasts((current) => [
      ...current,
      { ...toast, id: Math.random().toString(36).slice(2) },
    ]);
  };

  const dismissToast = (id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  return {
    toasts,
    addToast,
    dismissToast,
  };
}
