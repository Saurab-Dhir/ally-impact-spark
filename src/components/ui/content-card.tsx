import React from "react";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  backgroundImage: string;
  title: string;
  description?: string;
  icon: string;
  onClick?: () => void;
  className?: string;
}

const ContentCard = React.forwardRef<
  HTMLDivElement,
  ContentCardProps
>(({ backgroundImage, title, description, icon, onClick, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
        "h-64 w-full",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${backgroundImage})`,
      }}
      onClick={onClick}
      {...props}
    >
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        {/* Icon at top */}
        <div className="flex justify-start">
          <span className="text-3xl">{icon}</span>
        </div>
        
        {/* Title and description at bottom */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-white/80 line-clamp-2 group-hover:text-white/70 transition-colors">
              {description}
            </p>
          )}
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
});

ContentCard.displayName = "ContentCard";

export { ContentCard };