import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ChevronRight, Activity, Database, Zap } from 'lucide-react';
import './Dashboard.css';

const phases = [
    {
        id: 'phase1',
        title: 'Preliminary Research',
        subtitle: 'Phase 1',
        color: '#00f2ea', // Cyan
        icon: <Activity size={32} />,
        description: 'Delphi-based foundation building — identifying experts, establishing indicators, and setting research objectives.',
        steps: [
            {
                id: 'expert',
                title: 'Identify Expert Panel',
                description: 'Select domain experts from smart city governance, data management, and mobility systems to join the Delphi panel.',
            },
            {
                id: 'round1',
                title: 'Delphi Round 1',
                description: 'Collect expert input to identify measurable governance and mobility indicators for ICCC evaluation.',
            },
            {
                id: 'round2',
                title: 'Delphi Round 2',
                description: 'Use scoring to prioritize indicators and build consensus across the expert panel.',
            },
            {
                id: 'questionnaire',
                title: 'Develop Questionnaire',
                description: 'Convert the agreed indicators into a validated questionnaire for field data collection.',
            },
        ],
    },
    {
        id: 'phase2',
        title: 'Data Collection',
        subtitle: 'Phase 2',
        color: '#ff0055', // Neon Pink
        icon: <Database size={32} />,
        description: 'Collect primary and secondary data, and perform ETL-style cleaning to prepare datasets for analysis.',
        steps: [
            {
                id: 'snowball',
                title: 'Snowball Sampling Survey',
                description: 'Field deployment using snowball sampling among officials to obtain representative responses.',
            },
            {
                id: 'cleaning',
                title: 'Data Management & Cleaning',
                description: 'Ingest → Validate → Deduplicate → Normalize → Enrich → Export. Use Python (Pandas), Power BI, QGIS.',
            },
            {
                id: 'integration',
                title: 'Data Integration & Analysis',
                description: 'Merge datasets and derive indicators for dashboard KPIs: response times, incident counts, congestion levels.',
            },
        ],
    },
    {
        id: 'phase3',
        title: 'Objective Analysis',
        subtitle: 'Phase 3',
        color: '#ffd700', // Gold
        icon: <Zap size={32} />,
        description: 'Synthesize results, identify knowledge voids, and implement feedback-driven refinements.',
        steps: [
            {
                id: 'voids',
                title: 'Identify Knowledge Voids',
                description: 'Detect missing data, weak governance links, or low citizen engagement areas that need targeted interventions.',
            },
            {
                id: 'implementation',
                title: 'Implementation Loop',
                description: 'Pilot the ICCC dashboard, collect stakeholder feedback, and iterate to refine SOPs and technical architecture.',
            },
        ],
    },
];

export default function InteractiveMethodologyDashboard() {
    const [selectedPhase, setSelectedPhase] = useState(null);
    const [activeStep, setActiveStep] = useState(null);

    return (
        <div className="dashboard-container">
            <div className="grid-bg" />

            <header className="header">
                <motion.h1
                    className="title"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Methodology Dashboard
                </motion.h1>
                <motion.div
                    className="subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    Interactive flow for Tier-II Urban Mobility Governance
                </motion.div>
            </header>

            <AnimatePresence mode="wait">
                {!selectedPhase ? (
                    <motion.div
                        className="phases-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                    >
                        {phases.map((phase, index) => (
                            <PhaseCard
                                key={phase.id}
                                phase={phase}
                                index={index}
                                onClick={() => setSelectedPhase(phase)}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <PhaseDetail
                        phase={selectedPhase}
                        onBack={() => setSelectedPhase(null)}
                        onStepClick={setActiveStep}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {activeStep && (
                    <StepModal
                        step={activeStep}
                        color={selectedPhase?.color}
                        onClose={() => setActiveStep(null)}
                    />
                )}
            </AnimatePresence>

            <motion.footer
                className="footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                2025 Capstone Project • Pranjal Pattanaik
            </motion.footer>
        </div>
    );
}

function PhaseCard({ phase, index, onClick }) {
    return (
        <motion.div
            className="phase-card"
            style={{ '--phase-color': phase.color }}
            onClick={onClick}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <motion.div
                style={{ color: phase.color, marginBottom: '1rem' }}
                animate={{
                    filter: [
                        `drop-shadow(0 0 2px ${phase.color})`,
                        `drop-shadow(0 0 8px ${phase.color})`,
                        `drop-shadow(0 0 2px ${phase.color})`
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                {phase.icon}
            </motion.div>
            <div className="phase-subtitle" style={{ color: phase.color, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>
                {phase.subtitle}
            </div>
            <div className="phase-title">{phase.title}</div>
            <div className="phase-desc">{phase.description}</div>
        </motion.div>
    );
}

function PhaseDetail({ phase, onBack, onStepClick }) {
    return (
        <motion.div
            className="detail-view"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
        >
            <button className="back-btn" onClick={onBack}>
                <ArrowLeft size={18} /> Back to Phases
            </button>

            <div className="phase-header-large">
                <motion.h2
                    style={{ color: phase.color }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {phase.title}
                </motion.h2>
                <motion.p
                    className="phase-desc"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {phase.description}
                </motion.p>
            </div>

            <div className="steps-container">
                {phase.steps.map((step, idx) => (
                    <motion.div
                        key={step.id}
                        className="step-item"
                        style={{ '--phase-color': phase.color }}
                        onClick={() => onStepClick(step)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (idx * 0.1) }}
                        whileHover={{ x: 10 }}
                    >
                        <div className="step-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {step.title}
                            <ChevronRight size={18} style={{ opacity: 0.5 }} />
                        </div>
                        <div className="step-desc">{step.description}</div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function StepModal({ step, color, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <motion.div
                className="modal-content"
                style={{ borderColor: color, borderTopColor: color }}
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                <button className="close-modal" onClick={onClose}>
                    <X size={24} />
                </button>
                <h3 className="modal-title" style={{ color: color }}>{step.title}</h3>
                <p className="modal-body">{step.description}</p>
            </motion.div>
        </div>
    );
}
