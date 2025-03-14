import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  name: string;
  description: string;
  imageUrl: string;
  link: string;
}

const ProjectCard = ({ name, description, imageUrl, link }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-background/50 border rounded-lg p-4 transition-colors hover:bg-background/80"
    >
      <Link href={link} target="_blank" rel="noopener noreferrer" className="block">
        <div className="aspect-square relative mb-4 overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
