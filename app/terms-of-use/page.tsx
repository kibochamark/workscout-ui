import Wrapcomponent from "@/components/wrapcomponent";

export default function TermsOfUse() {
  return (
    <Wrapcomponent>
      <div className="min-h-screen mt-12 flex flex-col">
        <main className="flex-1 py-12 px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">WorkScout UK - Terms and Conditions</h1>
              <p className="text-muted-foreground">Last updated: April 2, 2025</p>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Definitions</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>&quot;WorkScout UK,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot; refers to WorkScout UK, the provider of job application and career support services.</li>
                <li>&quot;User,&quot; &quot;you,&quot; or &quot;your&quot; refers to any individual who accesses or uses our services.</li>
                <li>&quot;WorkScout&quot; refers to individuals providing services under our freelancer-based model.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Services Provided</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>WorkScout UK offers job application assistance, resume writing, LinkedIn optimization, and career support services.</li>
                <li>We are not a recruitment agency and do not guarantee employment.</li>
                <li>WorkScout UK may partner with third-party job boards and affiliate programs for commissions.</li>
                <li>Subscriptions provide access to different levels of service, including the Career Assistant service at the highest tier.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. User Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>You must provide accurate and complete information when using our services.</li>
                <li>You are responsible for any job applications submitted on your behalf.</li>
                <li>You agree not to misuse the platform, including providing false information or engaging in fraudulent activity.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. WorkScout Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>WorkScouts operate as independent freelancers and are responsible for completing assigned tasks.</li>
                <li>WorkScouts are paid per task and not on a fixed salary.</li>
                <li>WorkScout UK does not assume liability for actions taken by individual WorkScouts.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Payments and Refunds</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Subscription fees and service charges are outlined on our website.</li>
                <li>Payments must be made in full before services commence.</li>
                <li>Refunds are only granted under specific conditions, subject to our discretion.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Privacy and Data Protection</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>WorkScout UK complies with UK data protection laws.</li>
                <li>We collect and store user data only for service purposes and do not share it without consent.</li>
                <li>Users must not share confidential employer information with WorkScouts.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. Termination and Suspension</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>WorkScout UK reserves the right to suspend or terminate user access for violations of these terms.</li>
                <li>No refunds will be issued for terminations due to misuse or fraudulent activity.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">8. Governing Law</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>These terms are governed by the laws of England and Wales.</li>
                <li>Any disputes will be resolved in the courts of England and Wales.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">9. Contact Us</h2>
              <p className="text-muted-foreground">For any questions regarding these terms, contact us at:</p>
              <address className="not-italic text-muted-foreground">
                WorkScout UK<br />
                124 Clarence Road<br />
                Manchester, U.K. M13 0ZJ<br />
                Email: info@workscoutuk.co.uk<br />
              </address>
            </section>
          </div>
        </main>
      </div>
    </Wrapcomponent>
  );
}
