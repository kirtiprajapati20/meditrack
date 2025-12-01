import { Button } from '@/components/ui/button'
import { Stethoscope } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm border-b">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Stethoscope className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">MediTrack</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-5 md:py-20   lg:py-20 xl:py-10 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Revolutionizing Hospital Management
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    MediTrack provides a comprehensive suite of tools to streamline patient care, from records and scheduling to AI-powered diagnostics.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">
                      Go to Dashboard
                    </Link>
                  </Button>
                </div>
              </div>
               <div className="w-full max-w-md mx-auto">
                 <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-accent/20 to-secondary/20"></div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                       <Stethoscope className="w-32 h-32 text-primary opacity-60" strokeWidth={1}/>
                     </div>
                      <div className="absolute inset-4 border-2 border-primary/20 rounded-lg"></div>
                 </div>
               </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center p-4 border-t">
        <p className="text-sm text-muted-foreground">&copy; 2024 MediTrack. All rights reserved.</p>
      </footer>
    </div>
  )
}
