import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ContributionChart from '@/components/charts/ContributionChart';
import Scene from '@/components/3d/Scene';
import NeuralNetworkPlayground from '@/components/3d/NeuralNetworkPlayground';
import ScrollTrigger from '@/components/animations/ScrollTrigger';

// Sample data for the contribution chart
const contributionData = Array.from({ length: 365 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - 365 + i);

  // Generate random contribution count with higher values for recent dates
  const recency = i / 365; // 0 to 1 where 1 is most recent
  const baseCount = Math.floor(Math.random() * 5); // 0-4 base contributions
  const recencyBonus = Math.floor(Math.random() * 10 * recency); // More contributions for recent dates
  const count = baseCount + (Math.random() > 0.7 ? recencyBonus : 0);

  return {
    date: date.toISOString().split('T')[0],
    count,
  };
});

// Sample model metrics data
const modelMetrics = [
  { name: 'Image Classification', accuracy: 0.94, precision: 0.92, recall: 0.95 },
  { name: 'Sentiment Analysis', accuracy: 0.89, precision: 0.87, recall: 0.91 },
  { name: 'Object Detection', accuracy: 0.86, precision: 0.84, recall: 0.88 },
  { name: 'Named Entity Recognition', accuracy: 0.92, precision: 0.90, recall: 0.93 },
];

const AIShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contributions' | 'metrics' | 'playground'>('contributions');

  return (
    <section id="showcase" className="py-24 bg-dark">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="heading-lg gradient-text mb-4">AI Showcase</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-xl text-light/70 max-w-3xl mx-auto">
            Visualizing my contributions and model performance metrics
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-md shadow-sm bg-dark-lighter p-1">
            <button
              className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'contributions'
                  ? 'bg-primary text-white'
                  : 'text-light/70 hover:text-white'
              }`}
              onClick={() => setActiveTab('contributions')}
            >
              GitHub Contributions
            </button>
            <button
              className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'metrics'
                  ? 'bg-primary text-white'
                  : 'text-light/70 hover:text-white'
              }`}
              onClick={() => setActiveTab('metrics')}
            >
              Model Metrics
            </button>
            <button
              className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'playground'
                  ? 'bg-primary text-white'
                  : 'text-light/70 hover:text-white'
              }`}
              onClick={() => setActiveTab('playground')}
            >
              Neural Network
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-dark-lighter rounded-xl p-6 md:p-8 shadow-xl">
          {activeTab === 'contributions' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-6 text-center">GitHub Contribution Activity</h3>
              <ContributionChart data={contributionData} />
              <p className="text-center text-light/60 mt-6">
                Visualization of my GitHub contributions over the past year, showing my consistent work on AI/ML projects.
              </p>
            </motion.div>
          )}

          {activeTab === 'metrics' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col lg:flex-row items-center gap-8"
            >
              <div className="w-full lg:w-1/2">
                <h3 className="text-xl font-bold mb-6">Model Performance Metrics</h3>
                <div className="space-y-6">
                  {modelMetrics.map((model) => (
                    <div key={model.name} className="bg-dark-darker p-4 rounded-lg">
                      <h4 className="font-medium mb-3">{model.name}</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-light/70">Accuracy</span>
                            <span className="text-sm text-light/90">{(model.accuracy * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-dark h-2 rounded-full">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${model.accuracy * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-light/70">Precision</span>
                            <span className="text-sm text-light/90">{(model.precision * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-dark h-2 rounded-full">
                            <div
                              className="bg-secondary h-2 rounded-full"
                              style={{ width: `${model.precision * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-light/70">Recall</span>
                            <span className="text-sm text-light/90">{(model.recall * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-dark h-2 rounded-full">
                            <div
                              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                              style={{ width: `${model.recall * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-1/2 h-[400px]">
                <Scene
                  enableParticles={true}
                  particleCount={300}
                  backgroundColor="#1a1a1a"
                  enableOrbitControls={true}
                  showStars={true}
                  showEffects={true}
                  showFloatingText={false}
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'playground' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ScrollTrigger>
                <h3 className="text-xl font-bold mb-6 text-center">Interactive Neural Network</h3>
                <p className="text-center text-light/70 mb-8 max-w-3xl mx-auto">
                  Explore how neural networks process information by interacting with this visualization.
                  Click on nodes to change activations and connections to adjust weights.
                </p>

                <div className="h-[500px] w-full">
                  <NeuralNetworkPlayground
                    layers={[4, 6, 5, 3]}
                    interactive={true}
                  />
                </div>

                <div className="mt-8 bg-dark-darker p-4 rounded-lg">
                  <h4 className="font-medium mb-2">How Neural Networks Work</h4>
                  <p className="text-light/70 text-sm">
                    Neural networks are computational models inspired by the human brain. They consist of layers of
                    interconnected nodes (neurons) that process information. Each connection has a weight that
                    determines its influence on the network's output. During training, these weights are adjusted
                    to minimize the difference between predicted and actual outputs.
                  </p>
                </div>
              </ScrollTrigger>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIShowcase;
