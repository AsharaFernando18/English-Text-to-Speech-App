import { motion } from 'framer-motion'
import { 
  Heart, 
  Code, 
  Zap, 
  Shield, 
  Globe, 
  Accessibility,
  Github,
  ExternalLink
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function AboutPage() {
  const features = [
    {
      icon: Zap,
      title: 'Advanced AI Voices',
      description: 'Powered by cutting-edge neural networks for natural-sounding speech'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Support for multiple English accents and international languages'
    },
    {
      icon: Accessibility,
      title: 'Accessibility First',
      description: 'Built with screen readers, keyboard navigation, and WCAG compliance'
    },
    {
      icon: Shield,
      title: 'Privacy Focused',
      description: 'Your text stays private with local processing and secure cloud options'
    },
    {
      icon: Code,
      title: 'Open Source',
      description: 'Transparent, community-driven development with MIT license'
    },
    {
      icon: Heart,
      title: 'User Centered',
      description: 'Designed for content creators, educators, and accessibility needs'
    }
  ]

  const technologies = [
    'React 18 with TypeScript',
    'Tailwind CSS for styling',
    'Framer Motion for animations',
    'Web Speech API',
    'Cloud TTS integrations',
    'Progressive Web App',
    'Responsive design',
    'Modern browser APIs'
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            About Modern TTS
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A professional-grade text-to-speech application built with modern web technologies
            and designed for accessibility, performance, and user experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm">{tech}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>Project Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Our mission is to make text-to-speech technology accessible, powerful, and 
                easy to use for everyone. We believe in:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <span>Universal accessibility and inclusion</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <span>Privacy-first approach to user data</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <span>Open source and transparent development</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <span>Cutting-edge technology made simple</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Modern TTS is designed for a wide range of applications:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <span>Accessibility for visually impaired users</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <span>Content creation and podcasting</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <span>Language learning and pronunciation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <span>Educational materials and e-learning</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <span>Voice-over for presentations</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Modern TTS is an open-source project. We welcome contributions, feedback, 
                and suggestions from the community to make it even better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  View on GitHub
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground">
            Built with modern web technologies and a commitment to accessibility.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © 2024 Modern TTS. Released under the MIT License.
          </p>
        </motion.div>
      </div>
    </div>
  )
}