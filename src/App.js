import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
export default function SealSpinner() {
    const [count, setCount] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [clicks, setClicks] = useState([]);
    const [combo, setCombo] = useState(0);
    const [lastClickTime, setLastClickTime] = useState(0);
    const [shake, setShake] = useState(false);
    const containerRef = useRef(null);
    const playSound = () => {
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3");
        audio.volume = 0.05;
        audio.play().catch(() => { });
    };
    const getSealSize = () => {
        if (window.innerWidth < 600)
            return 110;
        if (window.innerWidth < 1000)
            return 130;
        return 140;
    };
    const handleClick = (e) => {
        const now = Date.now();
        const timeDiff = now - lastClickTime;
        const newCombo = timeDiff < 400 ? combo + 1 : 1;
        setCombo(newCombo);
        setLastClickTime(now);
        setCount((prev) => prev + 1);
        setRotation((prev) => prev + 360);
        if (newCombo >= 5) {
            setShake(true);
            setTimeout(() => setShake(false), 200);
        }
        playSound();
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newClick = { id: now, x, y };
        setClicks((prev) => [...prev, newClick]);
        setTimeout(() => {
            setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
        }, 800);
    };
    const progress = (combo % 10) * 10;
    return (_jsxs("div", { style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            backgroundColor: "#60a5fa",
            padding: "20px",
            transform: shake ? "scale(1.02)" : "scale(1)",
            transition: "transform 0.1s",
        }, children: [_jsx("h1", { style: { fontSize: 28, color: "white", marginBottom: 10 }, children: "\uD83E\uDDAD Seal Spinner" }), _jsxs("div", { style: {
                    background: "white",
                    padding: "20px",
                    borderRadius: "16px",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                    width: "320px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                }, children: [_jsxs("div", { style: { fontSize: 20, fontWeight: "bold" }, children: ["Spins: ", count] }), _jsxs("div", { ref: containerRef, onClick: handleClick, style: {
                            position: "relative",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }, children: [_jsx(motion.div, { animate: { rotate: rotation, scale: combo > 3 ? 1.1 : 1 }, transition: { duration: 0.4 }, style: {
                                    fontSize: getSealSize(),
                                    userSelect: "none",
                                    lineHeight: "1",
                                    marginBottom: "20px",
                                }, children: "\uD83E\uDDAD" }), clicks.map((c) => (_jsx(motion.div, { initial: { opacity: 1, y: 0 }, animate: { opacity: 0, y: -50 }, transition: { duration: 0.8 }, style: {
                                    position: "absolute",
                                    left: c.x,
                                    top: c.y,
                                    color: "green",
                                    fontWeight: "bold",
                                    zIndex: 2,
                                }, children: "+1" }, c.id)))] }), _jsxs("div", { style: { fontSize: 18, color: "red" }, children: ["Combo: ", combo] }), _jsx("div", { style: {
                            width: "200px",
                            height: "10px",
                            background: "#ddd",
                            borderRadius: "10px",
                            overflow: "hidden",
                        }, children: _jsx("div", { style: {
                                width: `${progress}%`,
                                height: "100%",
                                background: "green",
                            } }) }), _jsxs("div", { style: { fontSize: 14 }, children: ["Next tier: ", progress, "%"] })] })] }));
}
