'use client'

import {Button} from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const CodeExamples = () => {
  const [activeTab, setActiveTab] = useState<'server' | 'client'>('server');

  return (
      <div className="mt-8 md:mt-16 rounded-lg md:rounded-2xl border border-border/50 bg-background/80 backdrop-blur-sm p-0.5 md:p-1 shadow-xl md:shadow-2xl shadow-primary/10 w-full max-w-3xl md:max-w-4xl mx-auto overflow-hidden">
        <div className="bg-muted h-10 md:h-12 w-full border-b border-border/50 flex items-center px-3 md:px-4 justify-between">
          <div className="flex gap-1.5 md:gap-2 items-center">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
            <div className="text-xs text-muted-foreground ml-2 md:ml-4">auth-example.ts</div>
          </div>
          <div className="flex rounded-sm md:rounded-md bg-muted p-0.5 md:p-1 text-muted-foreground">
            <button
                onClick={() => setActiveTab('server')}
                className={`px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm rounded-sm ${
                    activeTab === 'server' ? 'bg-background text-foreground' : ''
                }`}
            >
              Server
            </button>
            <button
                onClick={() => setActiveTab('client')}
                className={`px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm rounded-sm ${
                    activeTab === 'client' ? 'bg-background text-foreground' : ''
                }`}
            >
              Client
            </button>
          </div>
        </div>
        <div className="p-4 md:p-6 text-left font-mono text-xs md:text-sm overflow-x-auto">
        <pre className="overflow-x-auto">
          <code className="text-foreground">
            {activeTab === 'server' ? (
                <>
                  <span className="text-purple-500">'use server'</span><br/><br/>
                  <span className="text-purple-500">import</span> {'{ getHasckServerSession }'} <span className="text-purple-500">from</span> <span className="text-green-500">"@/auth"</span>;<br/><br/>
                  <span className="text-gray-500">// Server Component Example</span><br/>
                  <span className="text-purple-500">export async function</span> <span className="text-blue-500">ProfilePage</span>() {'{'}<br/>
                  {'  '}<span className="text-purple-500">const</span> {'{ isAuthenticated, user, error }'} = <span className="text-purple-500">await</span> <span className="text-blue-500">getHasckServerSession</span>();<br/><br/>
                  {'  '}<span className="text-purple-500">if</span> (error) {'{'}<br/>
                  {'    '}<span className="text-purple-500">return</span> <span className="text-orange-500">&lt;div&gt;Error: {'{error}'}&lt;/div&gt;</span>;<br/>
                  {'  '}{'}'}<br/><br/>
                  {'  '}<span className="text-purple-500">if</span> (!isAuthenticated) {'{'}<br/>
                  {'    '}<span className="text-purple-500">return</span> <span className="text-orange-500">&lt;div&gt;Please sign in to view this content&lt;/div&gt;</span>;<br/>
                  {'  '}{'}'}<br/><br/>
                  {'  '}<span className="text-purple-500">return</span> (<br/>
                  {'    '}<span className="text-orange-500">&lt;div&gt;</span><br/>
                  {'      '}<span className="text-orange-500">&lt;h1&gt;</span>Welcome, <span className="text-orange-500">{'{user?.name}'}</span><span className="text-orange-500">&lt;/h1&gt;</span><br/>
                  {'      '}<span className="text-orange-500">&lt;p&gt;</span>Email: <span className="text-orange-500">{'{user?.email}'}</span><span className="text-orange-500">&lt;/p&gt;</span><br/>
                  {'    '}<span className="text-orange-500">&lt;/div&gt;</span><br/>
                  {'  '});<br/>
                  {'}'}
                </>
            ) : (
                <>
                  <span className="text-purple-500">'use client'</span><br/><br/>
                  <span className="text-purple-500">import</span> {'{ useHasckClientSession }'} <span className="text-purple-500">from</span> <span className="text-green-500">"@/auth/client"</span>;<br/><br/>
                  <span className="text-purple-500">export function</span> <span className="text-blue-500">UserProfile</span>() {'{'}<br/>
                  {'  '}<span className="text-purple-500">const</span> {'{ user, isAuthenticated, errorMessage, loading }'} = <span className="text-blue-500">useHasckClientSession</span>();<br/><br/>
                  {'  '}<span className="text-purple-500">if</span> (loading) {'{'}<br/>
                  {'    '}<span className="text-purple-500">return</span> <span className="text-orange-500">&lt;div&gt;Loading user data...&lt;/div&gt;</span>;<br/>
                  {'  '}{'}'}<br/><br/>
                  {'  '}<span className="text-purple-500">if</span> (errorMessage) {'{'}<br/>
                  {'    '}<span className="text-purple-500">return</span> <span className="text-orange-500">&lt;div&gt;Error: {'{errorMessage}'}&lt;/div&gt;</span>;<br/>
                  {'  '}{'}'}<br/><br/>
                  {'  '}<span className="text-purple-500">return</span> (<br/>
                  {'    '}<span className="text-orange-500">&lt;div&gt;</span><br/>
                  {'      '}<span className="text-orange-500">&lt;h2&gt;</span>Client Session Data<span className="text-orange-500">&lt;/h2&gt;</span><br/>
                  {'      '}<span className="text-orange-500">{'{isAuthenticated ? ('}</span><br/>
                  {'        '}<span className="text-orange-500">&lt;&gt;</span><br/>
                  {'          '}<span className="text-orange-500">&lt;p&gt;</span>Name: <span className="text-orange-500">{'{user?.name}'}</span><span className="text-orange-500">&lt;/p&gt;</span><br/>
                  {'          '}<span className="text-orange-500">&lt;p&gt;</span>Email: <span className="text-orange-500">{'{user?.email}'}</span><span className="text-orange-500">&lt;/p&gt;</span><br/>
                  {'        '}<span className="text-orange-500">&lt;/&gt;</span><br/>
                  {'      '}<span className="text-orange-500">) : ('}</span><br/>
                  {'        '}<span className="text-orange-500">&lt;p&gt;</span>Not authenticated<span className="text-orange-500">&lt;/p&gt;</span><br/>
                  {'      '}<span className="text-orange-500">)'}</span><br/>
                  {'    '}<span className="text-orange-500">&lt;/div&gt;</span><br/>
                  {'  '});<br/>
                  {'}'}
                </>
            )}
          </code>
        </pre>
        </div>
      </div>
  );
};

const FeatureCard = ({
                       icon,
                       title,
                       description
                     }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
    <div className="p-4 md:p-6 bg-background/80 backdrop-blur-sm rounded-lg md:rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{title}</h3>
      <p className="text-sm md:text-base text-muted-foreground">{description}</p>
    </div>
);

export default function Page() {
  return (
      <div className="min-h-screen flex flex-col">
        <nav className="w-full py-3 md:py-4 px-4 md:px-6 border-b border-transparent bg-background/80 backdrop-blur-sm fixed top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-lg md:text-xl font-bold text-primary">
              Hasck
            </Link>
            <div className="flex items-center gap-2 md:gap-4">
              <Button asChild variant="ghost" size="sm" className="text-sm md:text-base">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="text-sm md:text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </nav>

        <section className="flex flex-col items-center justify-center min-h-screen px-4 md:px-6 text-center pt-32 md:pt-32 pb-8">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl md:blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-48 h-48 md:w-72 md:h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl md:blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-8 left-1/2 w-48 h-48 md:w-72 md:h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl md:blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl md:max-w-4xl mx-auto mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 px-2">
              Modern Authentication for{" "}
              <span className="text-primary">Next.js</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-xs sm:max-w-md md:max-w-2xl mx-auto mb-6 md:mb-8 px-2">
              Hasck provides a clean, modern authentication template for your Next.js projects.
              Start building secure applications in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-2">
              <Button asChild size="lg" className="text-sm md:text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg">
                <Link href="/signup">Get Started →</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-sm md:text-base border-2 hover:bg-background/50 backdrop-blur-sm">
                <Link href="/login">Explore Features</Link>
              </Button>
            </div>

            <CodeExamples />
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/10 relative">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,white_10%,transparent_70%)] opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Why Choose <span className="text-primary">Hasck</span>?
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                A complete authentication solution designed for modern Next.js applications
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              <FeatureCard
                  icon={
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  }
                  title="Modern Stack"
                  description="Built with Next.js, TypeScript, and Tailwind CSS for a modern development experience."
              />

              <FeatureCard
                  icon={
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  }
                  title="Secure Authentication"
                  description="Industry-standard security practices with JWT tokens and secure password handling."
              />

              <FeatureCard
                  icon={
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                    </svg>
                  }
                  title="Ready to Scale"
                  description="Built with scalability in mind, perfect for projects of any size."
              />
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section className="py-16 md:py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent opacity-30"></div>
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Get Started
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Authentication?
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-8">
              Join thousands of developers who've streamlined their auth workflow with Hasck
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg">
                <Link href="/signup">Start Building Now →</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 hover:bg-background/50 backdrop-blur-sm">
                <Link href="/docs">Read Documentation</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer - New */}
        <footer className="py-8 md:py-12 border-t bg-background/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <Link href="/" className="text-lg font-bold text-primary">
                  Hasck
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Modern Authentication for Next.js
                </p>
              </div>
              <div className="flex gap-4 md:gap-6">
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy
                </Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms
                </Link>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
};