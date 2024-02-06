import AuthForm from "../auth/AuthForm";

function Hero() {
  return (
    <section className="min-h-[--section-height] bg-base-200">
      <div className="container hero min-h-full p-10">
        <div className="hero-content flex-col gap-8 lg:flex-row-reverse">
          <div className="max-w-sm text-center lg:text-left">
            <h1 className="text-5xl font-bold">THE HOOK</h1>
          </div>
          <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
            <AuthForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
