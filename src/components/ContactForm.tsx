import { useState, FormEvent } from 'react';
import { FirebaseService } from '../lib/firebaseService';
import styles from '../styles/ContactForm.module.css';

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const contactService = new FirebaseService<ContactMessage>('contactMessages');

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await contactService.create({
        ...formData,
        createdAt: new Date().toISOString(),
      });
      
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        
        <div className={styles.fieldGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        
        <div className={styles.fieldGroup}>
          <label htmlFor="message" className={styles.label}>Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={styles.textarea}
            rows={5}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        
        {submitStatus === 'success' && (
          <div className={styles.successMessage}>
            Message sent successfully! I'll get back to you soon.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className={styles.errorMessage}>
            There was an error sending your message. Please try again.
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;