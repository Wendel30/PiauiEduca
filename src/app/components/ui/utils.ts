import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Função utilitária para mesclar classes 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
