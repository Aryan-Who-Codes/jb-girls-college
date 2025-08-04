import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ERROR HANDLER
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    // ✅ Log error stack for better debugging
    console.error("Error Stack:", error.stack);

    // ✅ Handle Mongoose Validation Errors
    if ("errors" in error) {
      console.error("Mongoose Validation Error:", error.message);
      throw new Error(`Validation Error: ${error.message}`);
    }

    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    // ✅ Handle string errors
    console.error("String Error:", error);
    throw new Error(`Error: ${error}`);
  } else if (typeof error === "object" && error !== null) {
    // ✅ Handle unknown object errors safely
    console.error("Unknown Object Error:", error);
    throw new Error(`Unknown error: ${JSON.stringify(error, null, 2)}`);
  } else {
    // ✅ Catch truly unknown errors
    console.error("Unexpected Error Type:", error);
    throw new Error("An unexpected error occurred.");
  }
};
