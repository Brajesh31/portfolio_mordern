import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, Github, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SectionHeading from '../common/SectionHeading';
import { ContactFormData } from '../../types';
import { useTheme } from '../ThemeProvider';

const contactInfo = [
  {
    icon: <Mail className="text-primary-400" size={24} />,
    title: 'Email',
    content: 'bk117134@gmail.com',
    link: 'mailto:bk117134@gmail.com',
  },
  {
    icon: <MapPin className="text-primary-400\" size={24} />,
    title: 'Location',
    content: 'Noida, India',
  },
  {
    icon: <Linkedin className="text-primary-400" size={24} />,
    title: 'LinkedIn',
    content: 'linkedin.com/in/brajesh-kumar-9b58651a8',
    link: 'https://www.linkedin.com/in/brajesh-kumar-9b58651a8/',
  },
  {
    icon: <Github className="text-primary-400\" size={24} />,
    title: 'GitHub',
    content: 'github.com/Brajesh31',
    link: 'https://github.com/Brajesh31',
  },
];

const ContactCard: React.FC<{ info: (typeof contactInfo)[0] }> = ({ info }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-light-card dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="icon-box bg-light-bg dark:bg-dark-bg">{info.icon}</div>
        <div>
          <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">
            {info.title}
          </h3>
          {info.link ? (
            <a
              href={info.link}
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {info.content}
            </a>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">{info.content}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { theme } = useTheme();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      if (form.current) {
        const result = await emailjs.sendForm(
          'service_1n85l74',
          'template_s2gdt4j',
          form.current,
          'Udl5iGWEv35i-ZtfU'
        );

        if (result.status === 200) {
          setSubmitSuccess(true);
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
        }
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-section">
      <SectionHeading title="Contact" subtitle="Let's get in touch" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-light-card dark:bg-dark-card rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-lg transition-colors duration-300">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              Get in Touch
            </h3>

            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 dark:bg-green-900/30 border border-green-500 dark:border-green-700 text-green-700 dark:text-green-400 p-4 rounded-lg mb-6"
              >
                Your message has been sent successfully! I'll get back to you soon.
              </motion.div>
            ) : (
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="bg-red-100 dark:bg-red-900/30 border border-red-500 dark:border-red-700 text-red-700 dark:text-red-400 p-4 rounded-lg">
                    {submitError}
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-gray-600 dark:text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-600 dark:text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-600 dark:text-gray-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-600 dark:text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {contactInfo.map((info, index) => (
              <ContactCard key={index} info={info} />
            ))}
          </div>

          <div className="mt-8">
            <p className="text-gray-600 dark:text-gray-400">
              Feel free to reach out for collaboration, job opportunities, or just
              to say hi! I'll get back to you as soon as possible.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;