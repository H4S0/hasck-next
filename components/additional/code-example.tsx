'use client'

import { useState } from "react";

export const CodeExamples = () => {
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