export default function Hero() {
    return (
        <section className="py-20 px-4 text-center">
           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                {"Hi, I'm"} <span className="text-blue-600">Agraw</span>
            </h1>
            <p className="text-lg sm:text-xl max-w-xl mx-auto text-gray-600 mb-4">
                {"I'm a Software Engineer focused on full-stack development and embedded systems."}
            </p>
            <p className="text-lg sm:text-xl max-w-xl mx-auto text-gray-400 italic">
                In progress, more content coming soon!
            </p>
        </section>
    )
}