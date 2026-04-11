import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";

export default function CookiePolicy() {
  return (
    <Layout>
      <section className="py-16 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">Legal</Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Cookie <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              How we use cookies to improve your experience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-invert max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">1. What are cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files stored on your device that help web applications remember 
                your preferences and session state.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">2. Essential Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use essential cookies to manage your authentication session. These are strictly 
                necessary for you to log in and register for events. Without these cookies, the 
                platform cannot function securely.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. Functional Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use functional cookies to remember settings like your preferred theme (Dark/Light mode) 
                and selected filters.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Third-Party Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                EventFlow uses Supabase for authentication and database services, which may set its 
                own cookies to ensure a secure connection between your browser and our infrastructure.
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
