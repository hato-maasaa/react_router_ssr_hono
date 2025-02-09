import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { cn } from "app/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    const isPassword = type === "password";
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          {...props}
          type={isPassword && show ? "text" : type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute inset-y-0 right-0 mr-2 flex items-center text-sm"
          >
            {show ? (
              <Eye className="w-4 h-4 text-gray-500" />
            ) : (
              <EyeOff className="w-4 h-4 text-gray-500" />
            )}
          </button>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
