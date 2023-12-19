import { cn } from "@/lib/utils";
import * as React from "react";

const FadeInOnFirstScroll = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, _ref) => {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      });
    });

    if (domRef.current) observer.observe(domRef.current);
  }, []);

  return (
    <div
      className={cn(`fade-in-section ${isVisible ? 'is-visible' : ''}`, className)}
      ref={domRef}
      style={props.style}
    >
      {props.children}
    </div>
  );
})
FadeInOnFirstScroll.displayName = "FadeInOnFirstScroll";

export { FadeInOnFirstScroll }
