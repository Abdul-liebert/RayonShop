'use client';

import AutoPlay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [AutoPlay({ delay: 6000 })]);
const [selectedIndex, setSelectedIndex] = useState<number>(0);
const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);


  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

 const scrollTo = useCallback((index: number) => {
  if (emblaApi) emblaApi.scrollTo(index);
}, [emblaApi]);


  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport border-border-white mx-auto h-96 max-w-7xl rounded-xl border" ref={emblaRef}>
        <div className="embla__container h-full flex">
          <div className="embla__slide flex-0-0 w-full flex items-center justify-center text-white border-border-white">1</div>
          <div className="embla__slide flex-0-0 w-full flex items-center justify-center text-white border-border-white">2</div>
          <div className="embla__slide flex-0-0 w-full flex items-center justify-center text-white border-border-white">3</div>
        </div>
      </div>

          <div className="flex w-full justify-between items-center ">

      <div className="mt-4 flex items-center justify-center gap-3">
        <Button variant={'outline'} className="rounded-full" onClick={scrollPrev}>
          <ChevronLeft />
        </Button>
        <Button variant={'outline'} className="rounded-full" onClick={scrollNext}>
          <ChevronRight />
        </Button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-4 w-4 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'bg-black dark:bg-white' : 'border border-border-black dark:border-border-white'
            }`}
          />
        ))}
      </div>
          </div>
    </div>
  );
}
