import { Link } from "@/i18n/navigation";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
    external?: never;
  };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  external?: boolean;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-sm",
  md: "px-8 py-3 text-base",
  lg: "px-10 py-4 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-container text-on-primary-container rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 hover:brightness-110 active:scale-[0.98]",
  secondary:
    "glass-panel text-on-surface rounded-full hover:bg-surface-container-high/60 hover:shadow-lg hover:shadow-surface-bright/10 active:scale-[0.98]",
  outline:
    "border-2 border-primary-container text-primary-container rounded-full hover:bg-primary-container/10 hover:shadow-lg hover:shadow-primary/15 active:scale-[0.98]",
  ghost:
    "text-on-surface/70 hover:text-on-surface rounded-full hover:bg-surface-container/50 active:scale-[0.98]",
};

export function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `group inline-flex items-center justify-center gap-2.5 font-headline font-bold tracking-tight transition-all duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {iconLeft && <span className="shrink-0">{iconLeft}</span>}
      {children}
      {iconRight && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
          {iconRight}
        </span>
      )}
    </>
  );

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props as ButtonAsLink;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const { ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
