// src/components/download/DownloadSection.js
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import DownloadDialog from '../../ui/PayalateDownloadBtnUi';

const DownloadSection = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div className="mt-5 rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                {/* Download APK Button - Opens Dialog */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsDialogOpen(true)}
                    className="flex items-center gap-2 bg-helixaa-blue text-white px-6 py-2 rounded-full font-medium w-full sm:w-auto justify-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                    </svg>
                    Download APK
                </motion.button>

                {/* Google Play Store Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center rounded-full font-medium w-full sm:w-auto justify-center"
                >
                    <Image
                        src="playstoreIcon.png"
                        alt="Google Play"
                        width={150}
                        height={100}
                    />

                </motion.button>
            </div>

            {/* Download Dialog */}
            <DownloadDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </div>
    );
};

export default DownloadSection;