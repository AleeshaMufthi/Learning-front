import { Target, Award, Star } from "lucide-react";

export default function CareerFeatures() {
    const features = [
      {
        icon: Target,
        title: 'Explore new skills',
        description: 'Access 10,000+ courses in AI, business, technology, and more.',
      },
      {
        icon: Award,
        title: 'Earn valuable credentials',
        description: 'Get certificates for every course you finish and boost your chances of getting hired.',
      },
      {
        icon: Star,
        title: 'Learn from the best',
        description: 'Take your skills to the next level with expert-led courses and Coursera Coach, your AI-powered guide.',
      },
    ]
  
    return (
      <section className="py-14 px-4 bg-slate-50">
        <div className="container mx-auto text-gray-800">
          <h2 className="text-3xl font-bold text-center mb-10">
            Invest in your career
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-6"
              >
                <feature.icon className="w-8 h-8 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  