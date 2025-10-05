import { useState } from 'react';
import { X, Send, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Query Sent Successfully!",
      description: "Our travel experts will contact you within 24 hours.",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md w-full mx-auto max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl 
                   scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
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
              Send Query
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QueryModal;
