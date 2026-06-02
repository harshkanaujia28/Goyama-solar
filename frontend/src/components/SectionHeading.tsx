import { motion } from "framer-motion";

const SectionHeading = ({
  title,
  subtitle,
  highlight,
  center = true,
}: {
  title: string;
  subtitle?: string;
  highlight?: string;
  center?: boolean;
}) => {
  const renderTitle = () => {
    if (!highlight) return title;
    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}<span className="gradient-text">{highlight}</span>{parts[1] || ""}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 md:mb-16 ${center ? "text-center" : ""}`}
    >
      <h2 className="heading-lg">{renderTitle()}</h2>
      <div className={`divider-orange mt-4 ${center ? "mx-auto" : ""}`} />
      {subtitle && <p className="body-md text-muted-foreground mt-4 max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
};

export default SectionHeading;
