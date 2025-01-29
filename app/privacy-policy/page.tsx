import Wrapcomponent from "@/components/wrapcomponent";

export default function PrivacyPolicy() {
    return (
        <Wrapcomponent>
            <div className="min-h-screen mt-12 flex flex-col">

                <main className="flex-1 py-12 px-6">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold">Privacy Policy</h1>
                            <p className="text-muted-foreground">Last updated: January 29, 2024</p>
                        </div>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">1. Introduction</h2>
                            <p className="text-muted-foreground">
                                WorkScout ("we," "our," or "us") is committed to protecting the privacy of our clients. This Privacy
                                Policy explains how we collect, use, disclose, and safeguard your information when you use our job
                                application services, where we apply for jobs on your behalf.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
                            <p className="text-muted-foreground">
                                To provide our job application services, we collect the following types of information:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Personal identification information (name, email address, phone number, address)</li>
                                <li>Professional information (resume/CV, work history, education, skills, certifications)</li>
                                <li>Job preferences (desired roles, industries, locations, salary expectations)</li>
                                <li>Communication records between you and WorkScout</li>
                                <li>Information about the jobs we apply to on your behalf</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
                            <p className="text-muted-foreground">We use your information to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Create and manage your WorkScout account</li>
                                <li>Apply for jobs on your behalf</li>
                                <li>Customize job searches based on your preferences</li>
                                <li>Communicate with potential employers</li>
                                <li>Provide updates on your job applications</li>
                                <li>Improve our services and user experience</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">4. Sharing Your Information</h2>
                            <p className="text-muted-foreground">We may share your information with:</p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Potential employers when applying for jobs on your behalf</li>
                                <li>
                                    Third-party service providers who assist in our operations (e.g., hosting providers, email services)
                                </li>
                                <li>Legal authorities when required by law</li>
                            </ul>
                            <p className="text-muted-foreground">We will never sell your personal information to third parties.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">5. Your Rights and Choices</h2>
                            <p className="text-muted-foreground">You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Access and update your personal information</li>
                                <li>Request deletion of your account and data</li>
                                <li>Opt-out of certain data sharing practices</li>
                                <li>Withdraw consent for us to apply to jobs on your behalf</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">6. Data Security</h2>
                            <p className="text-muted-foreground">
                                We implement appropriate technical and organizational measures to protect your personal information.
                                However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute
                                security.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">7. Data Retention</h2>
                            <p className="text-muted-foreground">
                                We retain your personal information for as long as necessary to provide our services and comply with legal
                                obligations. You can request deletion of your account at any time.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">8. Changes to This Policy</h2>
                            <p className="text-muted-foreground">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
                                Privacy Policy on this page and updating the "Last updated" date.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">9. Contact Us</h2>
                            <p className="text-muted-foreground">
                                If you have any questions about this Privacy Policy, please contact us at:
                            </p>
                            <address className="not-italic text-muted-foreground">
                                WorkScout
                                <br />
                                124 Clarence road
                                <br />
                                Manchester, U.K. M13 0ZJ
                                <br />
                                Email: info@workscoutuk.co.uk
                                <br />
                                Phone: 0161 706 0549
                            </address>
                        </section>
                    </div>
                </main>

            </div>
        </Wrapcomponent>
    )
}

