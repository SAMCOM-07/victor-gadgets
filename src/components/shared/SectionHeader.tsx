import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
  className?: string;
  align?: "center" | "left";
  barColor?: "green" | "orange";
}

export function SectionHeader({
  title,
  subtitle,
  actionText,
  actionHref,
  className = "",
  align = "center",
  barColor = "green",
}: SectionHeaderProps) {
  const barClass =
    barColor === "orange" ? "bg-brand-orange" : "bg-brand-green";

  const btnClass =
    barColor === "orange"
      ? "border-brand-orange text-brand-orange-dark hover:bg-brand-orange-light"
      : "border-brand-green text-brand-green hover:bg-brand-green-light";

  return (
    <div
      className={`flex flex-col ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {/* Dashed Heading Style matching mart-home.png */}
      <div className="flex items-center gap-3">
        <span className={`w-8 sm:w-12 h-1 rounded-full ${barClass}`} />
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
          {title}
        </h2>
        <span className={`w-8 sm:w-12 h-1 rounded-full ${barClass}`} />
      </div>

      {subtitle && (
        <p className="mt-2.5 text-sm sm:text-base text-muted-foreground max-w-2xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}

      {actionText && actionHref && (
        <div className="mt-5">
          <Link
            href={actionHref}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              `rounded-full text-xs sm:text-sm font-semibold px-6 h-9 sm:h-10 gap-2 shadow-2xs transition-colors group cursor-pointer inline-flex items-center ${btnClass}`
            )}
          >
            {actionText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
}
