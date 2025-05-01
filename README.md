# Sohom Chatterjee - AI/ML Developer Portfolio

An immersive portfolio website showcasing my skills and projects as an AI/ML developer with interactive 3D visualizations and animations.

## Features

- **Neural Network Boot Animation**: Simulated neuron initialization on page load
- **Interactive 3D Brain Visualization**: Using React Three Fiber and GLTF models
- **Neural Network Background**: Dynamic visualization of neural connections
- **Modern Design**: Clean, professional design with smooth animations
- **3D Elements**: Interactive 3D elements using React Three Fiber
- **Responsive**: Fully responsive design that works on all devices
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets
- **Accessibility**: ARIA compliant and keyboard navigable
- **Smooth Scroll Transitions**: Section-based navigation with animated transitions
- **Interactive Project Cards**: 3D flip cards for project showcases
- **AI/ML Data Visualizations**: Showcasing real data with D3.js

## Technologies Used

- **Next.js 13**: React framework for server-side rendering and static site generation
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth transitions
- **React Three Fiber & Drei**: React renderer for Three.js
- **Three.js**: 3D library for WebGL
- **D3.js**: Data visualization library
- **React Scroll**: For smooth section navigation

## Project Structure

```
ai-ml-portfolio/
├── public/
│   ├── fonts/
│   ├── images/
│   ├── models/         # 3D models (GLTF/GLB)
│   │   ├── brain.glb
│   │   └── neuron.glb
│   └── textures/       # Textures for 3D models
│       ├── neural-normal.jpg
│       └── synapse-glow.jpg
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── BrainModel.tsx
│   │   │   ├── NeuralScene.tsx
│   │   │   ├── Neuron.tsx
│   │   │   └── TransitionEffect.tsx
│   │   ├── animations/
│   │   │   ├── BootAnimation.tsx
│   │   │   ├── NeuronBoot.tsx
│   │   │   ├── SynapseEffect.tsx
│   │   │   └── TextReveal.tsx
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── SEO.tsx
│   │   ├── sections/
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Skills.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── FlipCard.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── SkillTag.tsx
│   │   │   └── Timeline.tsx
│   │   └── visualizations/
│   │       ├── DataChart.tsx
│   │       └── NetworkGraph.tsx
│   ├── context/
│   │   ├── LoadingContext.tsx
│   │   └── ThemeContext.tsx
│   ├── data/
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   └── skills.ts
│   ├── hooks/
│   │   ├── useAnimatedRouter.ts
│   │   ├── useIntersectionObserver.ts
│   │   └── useThreeScene.ts
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── shaders.ts
│   │   └── transitions.ts
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── index.tsx
│   │   └── projects/[slug].tsx
│   ├── styles/
│   │   ├── globals.css
│   │   └── animation.css
│   ├── types/
│   │   ├── index.d.ts
│   │   └── three-types.d.ts
│   └── utils/
│       ├── animations.ts
│       ├── math.ts
│       └── three-helpers.ts
```

## Sections

- **Hero**: Animated 3D scene with introduction and neural network visualization
- **About**: Personal information and skills with interactive elements
- **Projects**: Showcase of AI/ML projects with 3D flip cards
- **AI Showcase**: Interactive visualizations of GitHub contributions and model metrics
- **Experience**: Timeline of professional experience
- **Contact**: Contact form and information

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Sagexd08/portfolio-website.git
cd portfolio-website
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Guidelines

- **Component Structure**: Follow atomic design principles
- **State Management**: Use React Context for global state
- **Styling**: Use Tailwind CSS utility classes
- **3D Elements**: Keep models optimized for web performance
- **Animations**: Use Framer Motion for UI animations and React Three Fiber for 3D animations
- **Accessibility**: Ensure all interactive elements are keyboard navigable and have proper ARIA attributes

## Deployment

This website can be easily deployed to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSagexd08%2Fportfolio-website)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Sohom Chatterjee - sohomchatterjee08@gmail.com

Project Link: [https://github.com/Sagexd08/portfolio-website](https://github.com/Sagexd08/portfolio-website)
