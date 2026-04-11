import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";

export default function TermsOfService() {
  return (
    <Layout>
      <section className="py-16 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">Legal</Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Terms of <span className="text-gradient">Service</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Rules and guidelines for using the EventFlow platform.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-invert max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using EventFlow, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use the platform.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">2. User Conduct</h2>
              <p className="text-muted-foreground leading-relaxed">
                As a user of EventFlow, you agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>Provide accurate information during registration.</li>
                <li>Respect event organizers and other participants.</li>
                <li>Not engage in any activity that disrupts the platform or events.</li>
                <li>Adhere to all campus rules and regulations during physical events.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. Event Registrations</h2>
              <p className="text-muted-foreground leading-relaxed">
                Registration for an event does not always guarantee entry if the venue capacity is reached. 
                Always follow the instructions provided by the respective club administrators. 
                Duplicate registrations or "ghost" signups (registering without intent to attend) may lead 
                to temporary account suspension.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Platform Roles</h2>
              <p className="text-muted-foreground leading-relaxed">
                Roles (Admin, Club Admin, Student) are assigned based on institutional verification. 
                Attempting to bypass role restrictions is a violation of these terms.
              </p>
            </div>

            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                Last updated: April 11, 2024
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
