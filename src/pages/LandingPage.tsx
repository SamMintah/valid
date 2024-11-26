import { useState } from 'react';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileCheck,
  Github,
  LineChart,
  Linkedin,
  Lock,
  Settings2,
  Twitter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { type Page } from '../App';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const features = [
  {
    icon: Bot,
    title: 'AI Validation Engine',
    description:
      'Advanced machine learning algorithms for accurate data validation',
  },
  {
    icon: Settings2,
    title: 'Customizable Rules',
    description: 'Create and customize validation rules to match your needs',
  },
  {
    icon: LineChart,
    title: 'Error Reporting',
    description: 'Comprehensive error tracking and analytics dashboard',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'Bank-grade security with data encryption at rest and in transit',
  },
];

const steps = [
  {
    number: '01',
    title: 'Connect Your Data',
    description: 'Easily integrate with your existing data sources',
  },
  {
    number: '02',
    title: 'Configure Rules',
    description: 'Set up custom validation rules or use AI-powered suggestions',
  },
  {
    number: '03',
    title: 'Monitor & Improve',
    description: 'Track validation results and optimize your data quality',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Data Engineer at TechCorp',
    content:
      'This platform has transformed our data validation process. The AI-powered rules have saved us countless hours of manual work.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  },
  {
    name: 'Michael Chen',
    role: 'CTO at DataFlow',
    content:
      'The best data validation solution we have used. The customizable rules and detailed reporting are exactly what we needed.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Lead Developer at StartupX',
    content:
      'Incredible platform with outstanding support. It has significantly improved our data quality and reduced validation time.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
];

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for small projects',
    features: [
      'Up to 1,000 validations/month',
      'Basic validation rules',
      'Community support',
      'Basic reporting',
    ],
  },
  {
    name: 'Standard',
    price: '$49',
    description: 'Great for growing teams',
    features: [
      'Up to 10,000 validations/month',
      'Advanced validation rules',
      'AI-powered suggestions',
      'Priority email support',
      'Advanced analytics',
    ],
  },
  {
    name: 'Premium',
    price: '$99',
    description: 'For enterprise needs',
    features: [
      'Unlimited validations',
      'Custom rule engine',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'Advanced security',
    ],
  },
];

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic
    setIsSignUpOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <FileCheck className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DataValidator</span>
          </div>
          <nav className="hidden space-x-6 md:flex">
            <a href="#features" className="text-muted-foreground hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground">
              How It Works
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground">
              Pricing
            </a>
          </nav>
          <Button onClick={() => setIsSignUpOpen(true)}>Sign Up</Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                  AI-Powered Data Validation for Modern Teams
                </h1>
                <p className="text-xl text-muted-foreground">
                  Validate your data with confidence using our advanced AI engine.
                  Reduce errors, save time, and improve data quality.
                </p>
                <div className="flex space-x-4">
                  <Button
                    size="lg"
                    onClick={() => onNavigate('dashboard')}
                  >
                    Try Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Watch Demo
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-lg border bg-card p-4 shadow-2xl">
                  <img
                    src="https://res.cloudinary.com/ds98aq9ei/image/upload/v1732642054/Macbook-Air-ai-data-validation-tool.vercel.app_dootuc.png"
                    alt="Dashboard Preview"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="border-t bg-muted/40 py-20"
        >
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold">Powerful Features</h2>
              <p className="mt-2 text-muted-foreground">
                Everything you need for robust data validation
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title}>
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-primary" />
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="border-t py-20"
        >
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold">How It Works</h2>
              <p className="mt-2 text-muted-foreground">
                Get started in three simple steps
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {step.number}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="border-t bg-muted/40 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold">What Our Users Say</h2>
              <p className="mt-2 text-muted-foreground">
                Trusted by data teams worldwide
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name}>
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    </div>
                    <p className="mb-4 text-muted-foreground">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="border-t py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
              <p className="mt-2 text-muted-foreground">
                Choose the plan that's right for you
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {plans.map((plan) => (
                <Card key={plan.name}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <p className="mt-2 text-3xl font-bold">{plan.price}</p>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-6 w-full">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2">
                <FileCheck className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">DataValidator</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                AI-powered data validation for modern teams
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>Documentation</li>
                <li>API Reference</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between border-t pt-8">
            <p className="text-sm text-muted-foreground">
              2024 DataValidator. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </div>
          </div>
        </div>
      </footer>

      {/* Sign Up Dialog */}
      <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign Up for DataValidator</DialogTitle>
            <DialogDescription>
              Get started with your free account today
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignUp}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="submit">Create Account</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}