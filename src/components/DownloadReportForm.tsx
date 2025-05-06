
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Mail, User, Building } from 'lucide-react';

interface DownloadFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
}

export function DownloadReportForm() {
  const form = useForm<DownloadFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: ''
    }
  });

  const onSubmit = async (data: DownloadFormData) => {
    try {
      const pageUrl = window.location.href;
      
      // Send data to the webhook without wrapping it
      await fetch('https://hook.eu2.make.com/4rulbma7noyux9at2usuaau9pgsuc8nl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          id: 'infomineo-form',
          title: 'Trump Tarrifs',
          formType: 'download',
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          company: data.company,
          consent: true,
          pageUrl: pageUrl
        }),
      });
      
      toast.success("Thank you! We'll send the insights to your email shortly.");
      console.log('Form submitted:', data);
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('There was a problem submitting your request. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 font-medium mb-1.5">First Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" strokeWidth={1.5} />
                    <Input 
                      placeholder="First name" 
                      {...field} 
                      className="pl-10 bg-white/10 border-transparent text-white focus:border-white/30 rounded-lg placeholder:text-white/90" 
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/90 font-medium mb-1.5">Last Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" strokeWidth={1.5} />
                    <Input 
                      placeholder="Last name" 
                      {...field} 
                      className="pl-10 bg-white/10 border-transparent text-white focus:border-white/30 rounded-lg placeholder:text-white/90" 
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/90 font-medium mb-1.5">Business Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" strokeWidth={1.5} />
                  <Input 
                    placeholder="you@company.com" 
                    {...field} 
                    type="email" 
                    className="pl-10 bg-white/10 border-transparent text-white focus:border-white/30 rounded-lg placeholder:text-white/90" 
                    required 
                  />
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
              <FormLabel className="text-white/90 font-medium mb-1.5">Company Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" strokeWidth={1.5} />
                  <Input 
                    placeholder="Your company" 
                    {...field} 
                    className="pl-10 bg-white/10 border-transparent text-white focus:border-white/30 rounded-lg placeholder:text-white/90" 
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full bg-white hover:bg-white/90 text-infomineo-blue font-medium py-3 mt-2 rounded-lg"
        >
          Subscribe for Exclusive Insights
        </Button>
        <p className="text-xs text-center text-white/80 mt-1">
          Get expert updates and reports directly to your inbox. By submitting this form, you agree to receive emails containing reports, industry insights, and other relevant information from Infomineo.
        </p>
      </form>
    </Form>
  );
}
