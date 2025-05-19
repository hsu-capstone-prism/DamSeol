import React from 'react';
import { motion } from 'framer-motion';

const spinnerVariants = {
    animate: {
        rotate: 360,
        transition: {
            repeat: Infinity,
            duration: 1,
            ease: 'linear',
        },
    },
};

const Loading = () => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        background: 'rgba(255,255,255,0.8)',
    }}>
        <motion.div
            variants={spinnerVariants}
            animate="animate"
            style={{
                width: 60,
                height: 60,
                border: '6px solid #e0e0e0',
                borderTop: '6px solid #1976d2',
                borderRadius: '50%',
                boxSizing: 'border-box',
            }}
        />
    </div>
);

export default Loading;