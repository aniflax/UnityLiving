import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export function group(stagger = 0.1, delay = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span" | "header" | "figure";
};

/** Fade-up on scroll into view. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay } },
      }}
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers Reveal-styled children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  as = "div",
}: RevealProps & { stagger?: number }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={group(stagger, delay)}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: Omit<RevealProps, "delay">) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={fadeUp}>
      {children}
    </Comp>
  );
}

/** Line-by-line hero headline reveal. */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0.2,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={cn("block", className)}
      initial="hidden"
      animate="visible"
      variants={group(0.15, delay)}
    >
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className={cn("block", lineClassName)}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
