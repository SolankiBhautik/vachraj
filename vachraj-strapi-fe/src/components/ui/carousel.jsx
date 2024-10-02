"use client";
import * as React from "react"
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image";
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import { motion, AnimatePresence } from 'framer-motion';

const CarouselContext = React.createContext(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return {
    ...context,
    thumbnails: context.thumbnails,
    onChange: context.onChange,
  };
}

const Carousel = React.forwardRef((
  {
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    thumbnails,
    onChange,
    ...props
  },
  ref
) => {
  const [carouselRef, api] = useEmblaCarousel({
    ...opts,
    axis: orientation === "horizontal" ? "x" : "y",
  }, plugins)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(
    api?.slidesInView()[0] || 0
  );
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

  const updateSelectedIndex = React.useCallback(() => {
    if (api) {
      setSelectedIndex(api.selectedScrollSnap());
    }
  }, [api]);


  const handleThumbnailClick = React.useCallback(
    (index) => {
      if (onChange) {
        onChange(index);
      }
      api?.scrollTo(index);
    },
    [onChange, api]
  );

  const onSelect = React.useCallback(
    (api) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    },
    []
  );

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])


  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback((event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      scrollPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      scrollNext()
    }

  }, [scrollPrev, scrollNext])

  React.useEffect(() => {
    if (!api || !setApi) {
      return
    }

    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    api.on("select", updateSelectedIndex);
    api.on("reInit", updateSelectedIndex);

    return () => {
      api?.off("select", onSelect);
      api?.off("select", updateSelectedIndex);
      api?.off("reInit", updateSelectedIndex);
    };
  }, [api, onSelect, updateSelectedIndex]);

  return (
    (<CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}>
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}>
        {children}
        {/* Thumbnails */}
        {thumbnails && (
          <div className="flex flex-wrap gap-2 mt-4 relative">
            <AnimatePresence>
              {thumbnails.map((thumbnail, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={
                    selectedIndex === index
                      ? { scale: 1.1, opacity: 1 }
                      : { scale: 1, opacity: 0.5 }
                  }
                  transition={{
                    type: "spring",
                    bounce: 0.5,
                    stiffness: 170,
                    damping: 14,
                    duration: 0.3,
                  }}
                  className="w-24 h-24 aspect-square relative cursor-pointer"
                  onClick={() => handleThumbnailClick(index)}
                >
                  <Image
                    className="w-24 h-24 aspect-square object-center object-cover rounded-lg"
                    src={`${baseUrl}${thumbnail.formats.small.url}`}
                    alt={thumbnail.alternativeText || thumbnail.name}
                    width={thumbnail.formats.small.width}
                    height={thumbnail.formats.small.height}
                  />
                  {selectedIndex === index && (
                    <motion.div
                      className="absolute inset-0 border-4 border-primary rounded-lg pointer-events-none"
                      aria-hidden="true"
                      layoutId="ThumbnailBorder"
                      transition={{
                        type: "spring",
                        bounce: 0.5,
                        stiffness: 170,
                        damping: 14,
                        duration: 0.3,
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </CarouselContext.Provider>)
  );
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    (<div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props} />
    </div>)
  );
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    (<div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props} />)
  );
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    (<Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute  h-8 w-8 rounded-full", orientation === "horizontal"
        ? "-left-12 top-1/2 -translate-y-1/2"
        : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}>
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>)
  );
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    (<Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn("absolute h-8 w-8 rounded-full", orientation === "horizontal"
        ? "-right-12 top-1/2 -translate-y-1/2"
        : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}>
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>)
  );
})
CarouselNext.displayName = "CarouselNext"

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
