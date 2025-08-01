'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeder from '../ui/SectionHeder';
import { Download } from 'lucide-react';
import DownloadSection from '../dialogBox/download/paylaterDownload';



function PayLaterSection() {

    const handleDownloadAPK = async () => {
        try {
            const response = await fetch('/api/track-paylater-download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ file: 'paylater-app' }),
            });

            const data = await response.json();

            if (!data.success) {
                console.error('Download tracking failed');
                return;
            }

            if (data.success) {

                const link = document.createElement('a');
                link.href = '/downloads/paylater.apk';
                link.setAttribute('download', 'PayLater-App.apk');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                console.log('Download tracked and initiated');
            }

        } catch (error) {
            console.error('Error tracking download:', error);
        }
    };

    return (
        <section id="paylater" className="py-20 bg-gradient-to-br from-helixaa-blue/5 to-white">
            <div className="container mx-auto px-4">


                <SectionHeder subtitle={" Revolutionizing mobile payments with our flagship buy-now-pay-later solution"}
                    titleTextColor={"text-helixaa-blue"}
                    subtitleTextColor={"text-helixaa-green"}
                    title={"PayLater App Features"}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-start mb-4">
                                    <div className="w-12 h-12 rounded-full bg-helixaa-green/20 flex items-center justify-center text-helixaa-green mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-helixaa-blue mb-2">Flexible Payments</h3>
                                        <p className="text-gray-600">
                                            Split purchases into interest-free installments. Choose from 3, 6, or 12-month payment plans with no hidden fees.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-start mb-4">
                                    <div className="w-12 h-12 rounded-full bg-helixaa-green/20 flex items-center justify-center text-helixaa-green mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 极 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-helixaa-blue mb-2">Secure Transactions</h3>
                                        <p className="text-gray-600">
                                            Bank-level security protects all transactions. Your financial data is encrypted and never shared without your permission.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-start mb-4">
                                    <div className="w-12 h-12 rounded-full bg-helixaa-green/20 flex items-center justify-center text-helixaa-green mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-helixaa-blue mb-2">Merchant Network</h3>
                                        <p className="text-gray-600">
                                            Use PayLater at 10,000+ partner stores across Sri Lanka. Enjoy special discounts and cashback offers at popular retailers.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-full bg-helixaa-green/20 flex items-center justify-center text-helixaa-green mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-helixaa-blue mb-2">Instant Approval</h3>
                                        <p className="text-gray-600">
                                            Get approved in seconds with our AI-powered credit assessment. Start using PayLater immediately after download.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2 flex justify-center relative"
                    >
                        <div className="w-full max-w-md">
                            <Image
                                src="paylaterAppPhoneMockup.svg"
                                alt="Hero Image"
                                width={500}
                                height={500}

                            />
                            <DownloadSection/>
                        </div>




                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-helixaa-green rounded-full opacity-10 blur-3xl -z-10"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-helixaa-blue rounded-full opacity-10 blur-3xl -z-10"></div>
                    </motion.div>
                </div>

                {/* Stats section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-32"
                >
                    {[
                        { value: "50K+", label: "Active Users" },
                        { value: "4.8★", label: "Play Store Rating" },
                        { value: "10K+", label: "Merchant Partners" },
                        { value: "LKR : 10M+", label: "Transactions Monthly" },
                    ].map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
                            <div className="text-3xl font-bold text-helixaa-blue mb-2">{stat.value}</div>
                            <div className="text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default PayLaterSection;