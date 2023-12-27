import { Logo } from "@/components/ui/logo";

export default function Home(props: any) {
  return (
    <main className="flex-1">
      <section
        className="w-full pt-12 md:pt-24 lg:pt-32 bg-center bg-cover"
      >
        <div className="flex flex-col items-center justify-center">
          <Logo
            className="w-1/4"
            sizes="40vw, 40vw"
          />
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Yeboster</h1>
        </div>
      </section>
    </main>
  )
}
