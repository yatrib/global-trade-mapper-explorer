
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Mail, User, Building } from 'lucide-react';

interface DownloadFormData {
  name: string;
  email: string;
  company: string;
}

export function DownloadReportForm() {
  const form = useForm<DownloadFormData>({
    defaultValues: {
      name: '',
      email: '',
      company: ''
    }
  });

  const onSubmit = (data: DownloadFormData) => {
    toast.success("Thank you! We'll send the insights to your email shortly.");
    console.log('Form submitted:', data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/90">Full Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Your name" {...field} className="pl-10 bg-white/10 border-white/20 text-white" required />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/90">Business Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="you@company.com" {...field} type="email" className="pl-10 bg-white/10 border-white/20 text-white" required />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/90">Company Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Your company" {...field} className="pl-10 bg-white/10 border-white/20 text-white" required />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full bg-infomineo-light hover:bg-white hover:text-infomineo-blue text-white font-medium py-3 mt-2 animate-pulse-soft shadow-lg"
        >
          Subscribe for Exclusive Insights
        </Button>
        <p className="text-xs text-center text-white/80">
          Get expert updates and reports directly to your inbox.
        </p>
      </form>
    </Form>
  );
}
