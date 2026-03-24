"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);

    // استخدام Motion Values عشان الأداء يبقى صاروخي من غير ما يعمل Re-render لـ React
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // إضافة نعومة (Spring) لحركة الماوس عشان ميبقاش ناشف
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        // التفاعل مع الزراير واللينكات (الماوس يكبر لما تقف على زرار)
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    // إخفاء الماوس الأساسي في الشاشات الصغيرة (الموبايل)
    if (typeof window !== "undefined" && window.innerWidth < 768) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full border"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: "-50%",
                translateY: "-50%",
            }}
            animate={{
                width: isHovering ? 100 : 50,
                height: isHovering ? 100 : 50,
                backgroundColor: isHovering ? "rgba(21, 0, 137, 0)" : "rgba(21, 0, 137, 0.2)",
                borderColor: isHovering ? "rgba(61, 241, 246, 0.8)" : "rgba(61, 241, 246, 0.4)",
                borderWidth: isHovering ? "2px" : "1px",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* لوجو الـ V */}
            <motion.svg
                animate={{
                    scale: isHovering ? 0 : 1.2,
                    opacity: isHovering ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
                width="60"
                height="60"
                viewBox="0 0 396 361"
                aria-hidden="true"
                className="drop-shadow-[0_0_8px_rgba(61,241,246,0.5)]"
            >
                <path
                    transform="matrix(1,0,-0,1,172.5,128)"
                    d="M95.2 0L55.4 77.3C44.5 98.4 39.1 102.2 39.1 102.2C38.2 102.6 36.3 103.3 27.3 104.8C15 102.6 10.3 99 10.3 99C8.7 97.8 4.1 93.4 0 83.2C2.7 83 9 82 17 76.6C19.5 74 24.1 65.8 24.1 65.8L32.7 49.2C36.8 40.6 39.9 35.2 51.5 15.9C71.7 2.3 95.2 0 95.2 0Z"
                    fill="#3df1f6"
                />
                <path
                    transform="matrix(1,0,-0,1,128,130)"
                    d="M24.6 49C39.3 41.8 42.4 34.4 43.7 31.5C44.4 28.2 44.4 24.8 44.4 11.2C32.8 0 19.2 0 19.2 0H0L24.6 49Z"
                    fill="#3df1f6"
                />
            </motion.svg>
        </motion.div>
    );
}