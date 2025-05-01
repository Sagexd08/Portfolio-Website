import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from './Button';

interface CardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink?: string;
  githubLink?: string;
  className?: string;
  icon?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  tags,
  demoLink,
  githubLink,
  className = '',
  icon,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [iconSvg, setIconSvg] = useState<string | null>(null);

  // Fetch SVG icon if provided
  useEffect(() => {
    if (icon) {
      fetch(icon)
        .then(res => res.text())
        .then(svg => setIconSvg(svg))
        .catch(err => console.error('Error loading icon:', err));
    }
  }, [icon]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className={`relative w-full h-[400px] rounded-xl perspective ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <motion.div
        className="w-full h-full preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onClick={handleFlip}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-darker to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <div className="flex items-center gap-3 mb-2">
                {iconSvg && (
                  <div
                    className="w-8 h-8 flex-shrink-0 bg-primary-500/20 rounded-full p-1.5 flex items-center justify-center text-primary-300"
                    dangerouslySetInnerHTML={{ __html: iconSvg }}
                  />
                )}
                <h3 className="text-xl font-bold text-white">{title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-primary/20 text-primary-light px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="text-xs bg-primary/20 text-primary-light px-2 py-1 rounded-full">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden bg-dark-800/90 rotateY-180 p-6 flex flex-col glass-card">
          <div className="flex items-center gap-3 mb-4">
            {iconSvg && (
              <div
                className="w-10 h-10 flex-shrink-0 bg-primary-500/20 rounded-full p-2 flex items-center justify-center text-primary-300"
                dangerouslySetInnerHTML={{ __html: iconSvg }}
              />
            )}
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
          <p className="text-light/80 text-sm flex-grow leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2 my-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-primary/20 text-primary-light px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3 mt-auto">
            {githubLink && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(githubLink, '_blank');
                }}
              >
                GitHub
              </Button>
            )}
            {demoLink && (
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(demoLink, '_blank');
                }}
              >
                Live Demo
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
