
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface DownloadFormData {
  email: string;
  company: string;
}

export function DownloadReportForm() {
  const form = useForm<DownloadFormData>();

  const onSubmit = (data: DownloadFormData) => {
    toast.success("Thank you! We'll send the report to your email shortly.");
    console.log('Form submitted:', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Email</FormLabel>
              <FormControl>
                <Input placeholder="you@company.com" {...field} type="email" required />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Your company" {...field} required />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Download Full Report</Button>
      </form>
    </Form>
  );
}
