
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const TariffFaq = () => {
  return (
    <div className="container mx-auto px-4 pb-12 pt-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="tariff-rationale" className="border-white/20 rounded-lg overflow-hidden mb-4 bg-white/10 backdrop-blur-sm">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/15">
              <span className="font-medium text-left text-white">
                The Rationale Behind America's Tariff Wave: Fixing Decades of Trade Imbalance
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 bg-white/5 text-white/90">
              <p>
                In a sweeping escalation of its America First trade agenda, the U.S. government has introduced a new wave 
                of tariffs aimed at correcting what it describes as decades of unfair trade practices and structural imbalances. 
                These measures include a baseline tariff on nearly all countries, alongside significantly higher rates for 
                nations labeled as the "worst offenders" in terms of trade imbalances and protectionist policies. Framed as 
                reciprocal, the policy seeks to reduce reliance on foreign production, reshore manufacturing, cut trade deficits, 
                and stimulate domestic investment.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default TariffFaq;
