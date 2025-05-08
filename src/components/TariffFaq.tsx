
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const TariffFaq = () => {
  return (
    <div className="container mx-auto px-4 pb-12 pt-8">
      <div className="max-w-3xl mx-auto">
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

          <AccordionItem value="beyond-economics" className="border-white/20 rounded-lg overflow-hidden mb-4 bg-white/10 backdrop-blur-sm">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/15">
              <span className="font-medium text-left text-white">
                Beyond Economics: Factors Shaping U.S. Tariff Policy
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 bg-white/5 text-white/90">
              <p className="mb-4">
                While tariffs are typically viewed as economic tools, the rationale behind their application or exemption often extends beyond trade metrics. Strategic, political, and security factors all play a role in shaping U.S. tariff policy, especially in a volatile global context.
              </p>
              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <strong>Geopolitical and Security Calculations:</strong> Tariff exclusions can be strategic, reflecting security alliances and geopolitical maneuvering. For instance, countries like Russia, Belarus, Cuba, and North Korea face exclusions due to existing sanctions and minimal trade. In Russia's case, the exemption reflects a strategic intent to leave room for future negotiations over Ukraine. Meanwhile, allies such as South Korea and Japan avoid retaliation that could risk defense relations.
                </li>
                <li>
                  <strong>Exceptions Under Global and Regional Pacts:</strong> Tariff policies are also shaped by international agreements, ensuring compliance and cooperation. Since 1995, a World Trade Organization (WTO) agreement has helped ensure that most countries, including the U.S., apply minimal or no tariffs on finished pharmaceutical products to keep medicines affordable. Additionally, goods that comply with USMCA rules remain exempt from the latest U.S. tariff measures.
                </li>
                <li>
                  <strong>Exemptions for Scarce Domestic Inputs:</strong> Items with limited domestic substitutes — such as semiconductors, critical minerals, or specific medical supplies — have been exempted to ensure continuity in strategic manufacturing sectors. Some exemptions target tech sectors with limited domestic production and high import dependency.
                </li>
                <li>
                  <strong>Exemptions for Key Local Sectors:</strong> Certain sectors critical to U.S. domestic industries are also being shielded. For example, timber and lumber products remain exempt to maintain housing affordability and support the U.S. construction sector during material shortages. Also, Russia's omission from the tariff list likely reflects a desire to avoid raising costs for American farmers, as the country represents the third-largest fertilizer supplier to the U.S.
                </li>
                <li>
                  <strong>Strategic Pressure on Trade Partners:</strong> Emerging reports suggest that the U.S. is leveraging tariff relief as a diplomatic tool, encouraging trade partners to reduce their economic reliance on China as a condition for exemptions. However, most allies have resisted this pressure, recognizing China's centrality to global trade. As the world's second-largest economy, severing or weakening ties with China could severely harm already fragile economies.
                </li>
                <li>
                  <strong>Political Influence on Exemption Outcomes:</strong> Some experts suggest that while exemptions were officially granted at the product level, inconsistencies emerged. They argue that firms producing similar goods experienced different outcomes, and that companies with links to the ruling Republican party may have had a higher chance of approval, though this remains speculative.
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="strategic-exemptions" className="border-white/20 rounded-lg overflow-hidden mb-4 bg-white/10 backdrop-blur-sm">
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/15">
              <span className="font-medium text-left text-white">
                Strategic Exemptions: Goods Exempted from the Tariff Wave
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 bg-white/5 text-white/90">
              <p className="mb-4">
                While pursuing tariff enforcement, the U.S. has exempted certain goods from the 10% baseline tariff to protect vital interests. These exemptions primarily target products where domestic alternatives are limited or where critical sectors could be harmed by price shocks or supply shortages.
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Steel and aluminum articles that are already subject to 25% tariff</li>
                <li>Automobiles and automotive parts that are already subject to 25% tariff</li>
                <li>Timber and lumber articles and derivative products</li>
                <li>Copper and derivative products</li>
                <li>Electronic products (Laptops and desktop computers, computer components and storage devices, smartphones and communication devices, and semiconductors and electronics)</li>
                <li>Select pharmaceutical products</li>
                <li>Certain critical minerals, energy products, coins and bullion</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default TariffFaq;
