import Wrapcomponent from "@/components/wrapcomponent"

export default function PrivacyPolicy() {
  return (
    <Wrapcomponent>
      <div className="min-h-screen mt-12 flex flex-col">
        <main className="flex-1 py-12 px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">WorkScout UK Policy</h1>
              <p className="text-muted-foreground">Last updated: April 2, 2025</p>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Service Commitment</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  WorkScout UK applies for jobs on behalf of clients based on their skills, experience, and preferences.
                </li>
                <li>Clients receive updates on applications, interviews, and job offers.</li>
                <li>
                  Additional career resources (such as rebranded or white-labelled courses) may be provided as part of
                  the service depending on subscription plan.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Subscription & Payment</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Clients pay a monthly subscription fee for ongoing job search support.</li>
                <li>Subscription covers job applications, career advice, and access to exclusive resources.</li>
                <li>Customers can cancel anytime.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Customers Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide accurate and up-to-date information on their CV, skills, and preferences.</li>
                <li>Attend scheduled interviews and respond to job offers in a timely manner.</li>
                <li>Notify WorkScout UK of any changes in job search preferences.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Job Matching & Success</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>WorkScout UK does not guarantee job placement but strives to maximize opportunities.</li>
                <li>
                  The company applies strategically, focusing on roles that align with the client&apos;s background.
                </li>
                <li>Clients remain responsible for securing job offers and fulfilling employer requirements.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Confidentiality & Data Protection</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>All client information is handled securely and used solely for job search purposes.</li>
                <li>WorkScout UK does not share client data with third parties without consent.</li>
                <li>Clients can request data deletion upon cancellation of service.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Code of Conduct</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Customers and WorkScout UK staff are expected to engage respectfully.</li>
                <li>Any misuse of services (e.g., providing false information) may result in termination.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. Complaints & Support</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Customers can raise concerns via email or instant chat service and WorkScout UK will aim to resolve
                  issues promptly.
                </li>
                <li>Support is available to ensure customers maximize the value of the service.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">8. Refund Policy</h2>
              <p className="text-muted-foreground">WorkScout UK Returns & Refund Policy</p>
              <p className="text-muted-foreground">
                At WorkScout UK, we apply for jobs on your behalf based on available listings from employers. Job
                availability is controlled by employers and job boards, meaning the number of applications we can submit
                may vary.
              </p>

              <h3 className="text-xl font-medium mt-4">Service Limitations</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>We can only apply for jobs that are actively listed by employers at the time of service.</li>
                <li>
                  If the number of available jobs changes, we will apply for as many as possible within the agreed
                  scope.
                </li>
              </ul>

              <h3 className="text-xl font-medium mt-4">Refund Eligibility</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Job Availability Changes:</strong> If fewer jobs are available than expected, we will apply
                  for all possible roles and adjust future applications accordingly, but refunds will not be issued for
                  changes in job availability.
                </li>
                <li>
                  <strong>Non-Delivery of Service:</strong> If we do not apply for any jobs that are or were available
                  within the month period limit you will receive a full refund.
                </li>
                <li>
                  <strong>Customer-Initiated Cancellations:</strong> If you cancel before we start applying, you are
                  eligible for a 70% refund to cover administrative costs.
                </li>
              </ul>

              <h3 className="text-xl font-medium mt-4">No Refunds for Completed Services</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Once job applications have been submitted, no refunds can be issued, as the service has been provided.
                </li>
              </ul>

              <h3 className="text-xl font-medium mt-4">Dispute Resolution</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  If you have concerns about your service, please contact us within 7 days of purchase, and we will work
                  to find a fair solution.
                </li>
              </ul>

              <p className="text-muted-foreground mt-4">
                At WorkScout UK, we ensure fairness by applying for the maximum number of available jobs while keeping
                our process flexible based on job board updates.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">9. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Policy, please contact us at:
              </p>
              <address className="not-italic text-muted-foreground">
                WorkScout UK
                <br />
                124 Clarence road
                <br />
                Manchester, U.K. M13 0ZJ
                <br />
                Email: info@workscoutuk.co.uk
                <br />
              
              </address>
            </section>
          </div>
        </main>
      </div>
    </Wrapcomponent>
  )
}

