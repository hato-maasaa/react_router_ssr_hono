import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "react-router";

const linkText = cva("leading-6 ", {
  variants: {
    font: {
      sans: "font-sans",
      serif: "font-serif",
      mono: "font-mono",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    },
    weight: {
      thin: "font-thin",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      destructive: "text-destructive",
      violet: "text-violet",
      blue: "text-blue-500",
      green: "text-green-500",
      gray: "text-gray-500",
      white: "text-white",
      black: "text-black",
    },
  },
  defaultVariants: {
    font: "sans",
    size: "base",
    weight: "normal",
    color: "blue",
  },
});

export type LinkText = VariantProps<typeof linkText> & {
  className?: string;
  children: React.ReactNode;
  to: string;
};

export const LinkText = ({
  font,
  weight,
  size,
  color,
  className,
  children,
  to,
}: LinkText) => {
  return (
    <Link
      to={to}
      className={linkText({ font, weight, size, color, className })}
    >
      {children}
    </Link>
  );
};
