"use client";
import React, { useEffect, useRef, useState } from 'react';

const TRAIL_LENGTH = 5;

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null); // The trailing ring/shape
    const dotRef = useRef<HTMLDivElement>(null); // The leading center dot
    const trailRefs = useRef<(HTMLDivElement | null)[]>([]); // Array of refs for trail dots

    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Use refs for mutable values to avoid re-renders during animation loop
    const mouse = useRef({ x: -100, y: -100 });
    const cursor = useRef({ x: -100, y: -100 });

    // Store coordinates for the trail
    const trailCoords = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 })));

    const rafId = useRef<number>(0);

    useEffect(() => {
        // Initial position to center of screen to avoid jump
        if (typeof window !== 'undefined') {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            mouse.current = { x: centerX, y: centerY };
            cursor.current = { x: centerX, y: centerY };
            trailCoords.current.forEach(p => { p.x = centerX; p.y = centerY; });
        }

        const onMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);

            // Move the main dot instantly for responsiveness
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
        };

        const animate = () => {
            // 1. Update Main Shape (Lagging Circle)
            // Linear Interpolation (LERP) for smooth trailing effect
            const lerpFactor = 0.15;

            const dx = mouse.current.x - cursor.current.x;
            const dy = mouse.current.y - cursor.current.y;

            cursor.current.x += dx * lerpFactor;
            cursor.current.y += dy * lerpFactor;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0)`;
            }

            // 2. Update Trail (Snake effect)
            let leadX = mouse.current.x;
            let leadY = mouse.current.y;

            trailCoords.current.forEach((point, index) => {
                // Each point follows the previous point (or mouse for the first one)
                // A higher factor makes it tighter, lower makes it looser
                const trailFactor = 0.4;

                const tDx = leadX - point.x;
                const tDy = leadY - point.y;

                point.x += tDx * trailFactor;
                point.y += tDy * trailFactor;

                const el = trailRefs.current[index];
                if (el) {
                    el.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
                }

                // Set lead for next iteration to be this point's current position
                leadX = point.x;
                leadY = point.y;
            });

            rafId.current = requestAnimationFrame(animate);
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Detect clickable elements
            const isClickable =
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[role="button"]') ||
                target.tagName.toLowerCase() === 'input' ||
                target.tagName.toLowerCase() === 'textarea' ||
                target.classList.contains('cursor-hover-trigger');

            setIsHovering(!!isClickable);
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        rafId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            cancelAnimationFrame(rafId.current);
        };
    }, [isVisible]);

    return (
        <>
            {/* Trailing "Snake" Dots */}
            {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => { trailRefs.current[i] = el; }}
                    className={`custom-cursor fixed top-0 left-0 pointer-events-none z-[9997] mix-blend-difference rounded-full bg-white
            transition-opacity duration-300
            ${isVisible && !isHovering ? 'opacity-40' : 'opacity-0'}
          `}
                    style={{
                        width: `${6 - i}px`, // Get smaller
                        height: `${6 - i}px`,
                        opacity: isVisible && !isHovering ? 0.6 - (i * 0.1) : 0, // Fade out
                        marginTop: `-${(6 - i) / 2}px`, // Center offset
                        marginLeft: `-${(6 - i) / 2}px`,
                    }}
                />
            ))}

            {/* Leading Dot - hidden when hovering for cleaner look */}
            <div
                ref={dotRef}
                className={`custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference
          transition-opacity duration-300 ${isVisible && !isHovering ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>

            {/* Trailing Shape (Circle) */}
            <div
                ref={cursorRef}
                className={`custom-cursor fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference will-change-transform`}
            >
                <div
                    className={`
            -translate-x-1/2 -translate-y-1/2
            border border-white
            transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
            rounded-full
            ${isVisible ? 'opacity-100' : 'opacity-0'}
            ${isHovering
                            ? 'w-14 h-14 bg-white/20 border-[1.5px]' // Hover state (larger circle)
                            : 'w-8 h-8 bg-transparent border-[1px]' // Default state (smaller circle)
                        }
          `}
                />
            </div>
        </>
    );
};

export default CustomCursor;