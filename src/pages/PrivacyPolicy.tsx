import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <section className="py-16 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">Legal</Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Your privacy is important to us. Learn how we handle your data.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-invert max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you register for an event on EventFlow, we collect basic information such as your name, 
                email address, and campus details (branch/year). This information is necessary to manage 
                your event registrations and provide you with relevant updates.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>Process your event registrations.</li>
                <li>Communicate vital event details and updates.</li>
                <li>Help club administrators manage their participant lists.</li>
                <li>Improve the platform experience for all students.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. Data Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We only share your registration details with the specific club administrators of the events 
                you choose to join. We do not sell or share your data with third-party advertisers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to view, update, or request the deletion of your account and registration 
                data at any time through your student dashboard or by contacting support.
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
