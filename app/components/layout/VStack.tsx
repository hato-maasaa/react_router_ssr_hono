import { cva, type VariantProps } from "class-variance-authority";
import { type ElementType, type ComponentPropsWithoutRef } from "react";

// Variants for HStack
const vstackVariants = cva("flex flex-col w-full", {
  variants: {
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
    wrap: {
      false: "flex-nowrap",
      true: "flex-wrap",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
    },
  },
  defaultVariants: {
    align: "start",
    wrap: true,
    gap: 4,
  },
});

// Type for HStack Props
type VStackProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & VariantProps<typeof vstackVariants> &
  ComponentPropsWithoutRef<T>;

/**
 * A flexible vertical stack layout component.
 */
export const VStack = <T extends ElementType = "div">({
  as,
  align,
  wrap,
  gap,
  className,
  children,
  ...rest
}: VStackProps<T>) => {
  const Component = as || "div";

  return (
    <Component
      className={
        vstackVariants({ align, wrap, gap }) +
        (className ? ` ${className}` : "")
      }
      {...rest}
    >
      {children}
    </Component>
  );
};
