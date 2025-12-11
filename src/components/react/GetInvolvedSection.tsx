import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { CheckCircle2, Mail, Phone, Download } from 'lucide-react';

interface GetInvolvedSectionProps {
  title: string;
  subtitle?: string;
  waysTitle?: string;
  ways?: string[];
  contactEmail?: string;
  contactPhone?: string;
  contactUsTitle?: string;
  message?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function GetInvolvedSection({
  title,
  subtitle,
  waysTitle,
  ways,
  contactEmail,
  contactPhone,
  contactUsTitle,
  message,
  buttonText,
  buttonLink,
}: GetInvolvedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="get-involved" ref={ref} className="py-12 bg-linear-to-b from-white to-accent-light min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-blue mb-3">{title}</h2>
          {subtitle && (
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-4">{subtitle}</p>
          )}
          <div className="section-underline"></div>
        </motion.div>

        <div className="flex justify-center">
          {/* Centered Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col w-full max-w-2xl"
          >
            {(ways && ways.length > 0) || message ? (
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-accent-lighter flex-1 flex flex-col">
                {ways && ways.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold text-primary-blue mb-4">{waysTitle}</h3>
                    <ul className="space-y-3 mb-6 flex-1">
                      {ways.map((way, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                          className="flex items-start"
                        >
                          <CheckCircle2 className="w-5 h-5 text-medium-blue mr-3 mt-0.5 shrink-0" />
                          <span className="text-base text-gray-700 leading-relaxed">{way}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </>
                )}

                {message && (
                  <div className={ways && ways.length > 0 ? "border-t border-gray-200 pt-4" : ""}>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {message}
                    </p>
                  </div>
                )}
              </div>
            ) : null}

            {(contactEmail || contactPhone) && (
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-accent-lighter mt-6">
                <h3 className="text-xl font-bold text-primary-blue mb-4">{contactUsTitle || "Contact Us"}</h3>
                <div className="space-y-3">
                  {contactEmail && (
                    <a 
                      href={`mailto:${contactEmail}`} 
                      className="flex items-center text-base text-gray-700 hover:text-medium-blue transition-colors duration-200 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center mr-3 group-hover:bg-accent-lighter transition-colors duration-200">
                        <Mail className="w-5 h-5 text-medium-blue" />
                      </div>
                      <span className="font-medium">{contactEmail}</span>
                    </a>
                  )}
                  {contactPhone && (
                    <a 
                      href={`tel:${contactPhone}`} 
                      className="flex items-center text-base text-gray-700 hover:text-medium-blue transition-colors duration-200 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center mr-3 group-hover:bg-accent-lighter transition-colors duration-200">
                        <Phone className="w-5 h-5 text-medium-blue" />
                      </div>
                      <span className="font-medium">{contactPhone}</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {buttonText && buttonLink && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-6"
              >
                <motion.a
                  href={buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="get-involved-btn w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-5 h-5 mr-2" />
                  {buttonText}
                </motion.a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
