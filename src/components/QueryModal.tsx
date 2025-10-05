import { useState } from 'react';
import { X, Send, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface QueryModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData?: any;
}

const QueryModal = ({ isOpen, onClose, packageData }: QueryModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [showAnimation, setShowAnimation] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageData) return;

    const phoneNumber = '919696415586'; // your WhatsApp number with country code

    // Construct message
    const msg = `
Hello! I'm interested in the package: ${packageData.title}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}
`;

    const encodedMsg = encodeURIComponent(msg);

    // Show airplane animation
    setShowAnimation(true);

    // Open WhatsApp in a new tab
    window.open(`https://wa.me/${9696415586}?text=${encodedMsg}`, '_blank');

    // Toast
    toast({
      title: "Query Sent!",
      description: "Your message is ready to send on WhatsApp.",
    });

    // Clear form
    setFormData({ name: '', email: '', phone: '', message: '' });

    // Hide animation after 2 seconds and close modal
    setTimeout(() => {
      setShowAnimation(false);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md w-full mx-auto max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl 
                   scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent relative"
      >
        {/* Airplane Animation */}
        <AnimatePresence>
          {showAnimation && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: -50, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute top-0 left-1/2 -translate-x-1/2 z-50"
            >
              <div className="w-12 h-12 bg-[url('/airplane.png')] bg-contain bg-no-repeat"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogHeader className="sticky top-0 bg-white/95 backdrop-blur-md z-10 pb-3">
          <DialogTitle className="text-2xl font-bold text-mountain-green flex items-center">
            <Send className="mr-2 h-6 w-6" />
            Send Query
          </DialogTitle>
          {packageData && (
            <p className="text-muted-foreground">
              Interested in:{" "}
              <span className="font-semibold text-sky-blue">{packageData.title}</span>
            </p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              name="email"
              type="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              name="phone"
              type="tel"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Textarea
              name="message"
              placeholder="Tell us about your travel preferences, dates, or any specific requirements..."
              value={formData.message}
              onChange={handleChange}
              className="pl-10 min-h-[100px] resize-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 btn-adventure"
            >
              <Send className="mr-2 h-4 w-4" />
              Send via WhatsApp
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QueryModal;
