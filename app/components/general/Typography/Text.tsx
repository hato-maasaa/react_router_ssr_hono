import { cva, type VariantProps } from "class-variance-authority";

const text = cva("leading-6 ", {
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
    color: "primary",
  },
});

export type Text = VariantProps<typeof text> & {
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const Text = ({
  size,
  font,
  weight,
  color,
  as: Tag = "span",
  className,
  children,
  ...props
}: Text) => {
  return (
    <Tag className={text({ size, font, weight, color, className })} {...props}>
      {children}
    </Tag>
  );
};
