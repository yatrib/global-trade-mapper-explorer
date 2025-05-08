import React, { useState } from 'react';
import { Flag, AlertTriangle, TrendingUp, ChevronDown, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, HighlightedText } from '@/components/ui/tooltip';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isHighlighted?: boolean;
  country: 'us' | 'china' | 'global' | 'canada-mexico' | 'eu';
  tooltip?: {
    highlightText: string;
    content: React.ReactNode;
  };
}

// Combined US and China timeline events data, sorted by date
const combinedUsChina: TimelineEvent[] = [
  {
    date: 'Feb 1, 2025',
    title: 'Initial Tariffs Ordered',
    description: 'Days after returning to office, Trump ordered a 10% tariff on all Chinese imports, adding to existing duties from both his previous administration and the Biden era, effective February 4.',
    icon: <Flag className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'us'
  }, {
    date: 'Feb 4, 2025',
    title: 'Tariffs Take Effect',
    description: '10% tariffs on Chinese imports take effect.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'us'
  }, {
    date: 'Feb 4, 2025',
    title: 'Retaliatory Tariffs Announced',
    description: 'China announces retaliatory 15% tariffs on U.S. coal and liquefied natural gas, a 10% tariff on cruder oil, agricultural machinery, and large cars, and an anti-monopoly investigation into Google.',
    icon: <Flag className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'china'
  }, {
    date: 'Feb 10, 2025',
    title: 'Tariffs Implementation',
    description: 'China imposes 15% tariffs on coal and liquefied natural gas products, and 10% tariffs on crude oil, agricultural machinery, and large-engine cars imported from the U.S.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'china'
  }, {
    date: 'Feb 10, 2025',
    title: 'Steel and Aluminum Tariffs',
    description: 'Trump announces the reinstatement of increased tariffs on foreign steel and aluminum, marking a return to a policy first introduced during his previous term. The exemptions granted under the 2018 tariffs are eliminated, resulting in a minimum 25% tariff on all imported steel and an increase in aluminum tariffs from 10% to 25%.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  }, {
    date: 'Mar 4, 2025',
    title: 'Tariffs Doubled',
    description: 'Trump doubles tariffs on all Chinese imports to 20%.',
    icon: <TrendingUp className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'us'
  }, {
    date: 'Mar 10, 2025',
    title: 'Agricultural Tariffs',
    description: 'China enacts new tariffs of 10% and 15% on U.S. agricultural exports, targeting products where it is the largest overseas market. In parallel, Beijing restricts 15 American companies from purchasing Chinese goods without prior authorization and blocks 10 others from conducting business in China, including a drone manufacturer that supplies the U.S. military.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'china',
    tooltip: {
      highlightText: '10% and 15% on U.S. agricultural exports',
      content: (
        <ul className="list-disc pl-4">
          <li>15% on chicken, wheat, and corn</li>
          <li>10% tariff on soybeans, pork, beef, and fruits</li>
        </ul>
      )
    }
  }, {
    date: 'Mar 12, 2025',
    title: 'Steel and Aluminum Tariffs Take Effect',
    description: 'The updated U.S. tariffs on all foreign steel and aluminum officially take effect.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  }, {
    date: 'Mar 24, 2025',
    title: 'Venezuela Oil Tariffs',
    description: 'The United States announces that starting April 2, a 25% tariff will apply to goods imported from countries that purchase oil from Venezuela, whether through direct trade or intermediaries.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  }, {
    date: 'Mar 26, 2025',
    title: 'Automobile Tariffs Announced',
    description: 'Trump confirms the introduction of 25% tariffs on automobile imports, describing the move as a way to encourage domestic car production. These tariffs are scheduled to begin on April 3 with fully assembled vehicles, followed by additional levies on car parts phased in by May 3.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  }, {
    date: 'Apr 2, 2025',
    title: '"Liberation Day" Agenda',
    description: 'As part of the administration\'s "Liberation Day" agenda, Trump unveils a new 34% tariff targeting Chinese imports. These duties are layered atop earlier levies, pushing the cumulative rate to 54%.',
    icon: <Flag className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'us'
  }, {
    date: 'Apr 3, 2025',
    title: 'Auto Tariffs Take Effect',
    description: 'The U.S. begins collecting tariffs on imported automobiles, following the policy rollout announced in late March.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  }, {
    date: 'Apr 4, 2025',
    title: 'Matching Tariffs Announced',
    description: 'China announces a matching 34% tariff on all U.S. imports (effective Apr 10), expands rare earth export controls, and sanctions 27 more U.S. companies.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'china'
  }, {
    date: 'Apr 7, 2025',
    title: 'Additional Tariff Threat',
    description: 'Trump threatens an additional 50% tariff on China, which could raise total tariffs to 104%.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'us'
  }, {
    date: 'Apr 9, 2025',
    title: '104% Tariff Applied',
    description: 'The full rate of 104% is applied to Chinese goods under the updated U.S. tariff structure.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'us'
  }, {
    date: 'Apr 9, 2025',
    title: 'Selective Tariff Pause',
    description: 'Trump temporarily reverses course, announcing a 90-day suspension of his reciprocal tariff increases. During this pause, a flat 10% rate would apply to most imports. However, he explicitly excludes China from this suspension and instead raises tariffs on Chinese goods to 125%, following Beijing\'s retaliatory move.',
    icon: <Flag className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'us'
  }, {
    date: 'Apr 9, 2025',
    title: 'Additional Tariffs Response',
    description: 'In a direct countermeasure, China imposes an additional 50% tariff on all U.S. exports effective April 10, raising its overall tariff rate to 84%. China\'s response comes within 12 hours of the U.S. implementation.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'china'
  }, {
    date: 'Apr 10, 2025',
    title: 'Total Tariff Clarification',
    description: 'The White House provides clarification, noting that the newly announced 125% tariff on Chinese imports is being added to a previously implemented 20% levy. This adjustment brings the total tariff burden on Chinese goods to 145%.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'us'
  }, {
    date: 'Apr 11, 2025',
    title: 'Electronics Tariff Exemption',
    description: 'Trump\'s administration announces a temporary exemption for several categories of electronics, including smartphones, computers, and related devices. These exemptions apply to the 10% global baseline tariff and the broader import taxes imposed on Chinese goods. However, electronic items from China still face the 20% tariff linked to fentanyl enforcement.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  }, {
    date: 'Apr 11, 2025',
    title: 'Total Tariff Increase',
    description: 'China raises its total duties on all U.S. goods to 125%.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'china'
  }, {
    date: 'Apr 13, 2025',
    title: 'Tech Tariff Consideration',
    description: 'Trump signals that the recent exemptions for electronics may be temporary. He states that new tariffs are being considered on computer chips, indicating an escalation in tech-related trade restrictions.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  }, {
    date: 'Apr 22, 2025',
    title: 'Diplomatic Stance',
    description: 'Trump says he\'s waiting for Xi to initiate talks and claims a "very good relationship."',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'us'
  }, {
    date: 'Apr 22, 2025',
    title: 'Diplomatic Strategy',
    description: 'Xi avoids direct talks, instead launches diplomatic outreach to other trade partners.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'china'
  }, {
    date: 'Apr 23, 2025',
    title: 'Potential Tariff Reduction',
    description: 'Trump signals potential tariff reduction: base rate may drop from 145% to 50–65%, with strategic items still facing up to 100%.',
    icon: <TrendingUp className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'us'
  }, {
    date: 'Apr 24, 2025',
    title: 'Negotiation Claims Denied',
    description: 'China\'s Ministry of Commerce denies Trump\'s claims of ongoing trade talks, stating that no negotiations are currently taking place between the two countries.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'china'
  }, {
    date: 'Apr 29, 2025',
    title: 'Automotive Sector Relief',
    description: 'Two executive orders are signed by Trump, modifying how tariffs are applied to the automotive sector. The 25% auto tariffs will no longer be compounded with other tariffs, such as those on imported steel and aluminum, offering partial relief to affected automakers.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  }, {
    date: 'Apr 30, 2025',
    title: 'Quiet Tariff Exemptions',
    description: 'China quietly notifies select firms — particularly those reliant on U.S. technologies — of exemptions from its 125% tariffs, using private outreach to ease trade tensions without a public announcement.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'china'
  }
];

// US, Canada, and Mexico timeline events
const usCanadaMexico: TimelineEvent[] = [
  {
    date: 'Jan 20, 2025',
    title: 'Initial Tariff Intent',
    description: 'Just hours after taking the oath of office, Trump announces his intent to impose additional 25% tariffs on imports from Canada and Mexico beginning February 1. He justifies the move by accusing both neighboring countries of failing to sufficiently curb the flow of narcotics and migrants into the United States.',
    icon: <Flag className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'us'
  },
  {
    date: 'Feb 1, 2025',
    title: 'Tariff Executive Order',
    description: 'Trump signs executive order imposing 25% tariffs on imports from Canada and Mexico not covered under USMCA, effective Feb 4.',
    icon: <Flag className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'us',
    tooltip: {
      highlightText: 'USMCA',
      content: (
        <HighlightedText text="The United States-Mexico-Canada Agreement (#00B9FF[USMCA]), which took effect on July 1, 2020, is a trade pact that replaced the 1994 North American Free Trade Agreement (NAFTA). Initiated under the Trump administration and signed on November 30, 2018, the USMCA aims to create shared economic benefits for workers, agricultural producers, and businesses across North America." />
      )
    }
  },
  {
    date: 'Feb 3, 2025',
    title: 'Temporary Tariff Pause',
    description: 'Trump agrees to a 30-day pause on tariffs against Canada and Mexico after both pledge action on border security and drug trafficking.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'us'
  },
  {
    date: 'Feb 10, 2025',
    title: 'Steel and Aluminum Tariffs',
    description: 'Trump announces the reinstatement of increased tariffs on foreign steel and aluminum, marking a return to a policy first introduced during his previous term. The exemptions granted under the 2018 tariffs are eliminated, resulting in a minimum 25% tariff on all imported steel and an increase in aluminum tariffs from 10% to 25%.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  },
  {
    date: 'Mar 4, 2025',
    title: 'Canadian Retaliatory Tariffs',
    description: 'Canada imposes 25% tariffs on CA30 billion in U.S. goods, including a wide range of consumer products. Canada plans to broaden its retaliatory tariffs over the following 21 days, eventually covering an additional US$125 billion in American imports. Mexican President Sheinbaum pledges retaliatory tariffs on U.S. imports.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'canada-mexico',
    tooltip: {
      highlightText: 'wide range of consumer products',
      content: (
        <HighlightedText text="Products in the first wave of tariffs include #00B9FF[live poultry, dairy produce, vegetables, coffee and tea, products from the milling industry, oil seeds, sugar, beverages, spirits and vinegar, tobacco, plastics, rubber, wood, paper, apparel and accessories, articles of iron and steel, aircraft parts and accessories, and arms and ammunition]." />
      )
    }
  },
  {
    date: 'Mar 4, 2025',
    title: 'Tariffs Take Effect',
    description: '25% tariffs take effect on Canadian and Mexican goods; Canadian energy imports are limited to a 10% rate.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'us'
  },
  {
    date: 'Mar 5, 2025',
    title: 'Automaker Exemption',
    description: 'Trump grants one-month tariff exemption for U.S. automakers importing from Canada and Mexico, after speaking with the leaders of the "Big 3" automakers — Ford, General Motors and Stellantis.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'us'
  },
  {
    date: 'Mar 6, 2025',
    title: 'Extended Tariff Pause',
    description: 'Trump extends the tariff pause by one month on many Canadian and Mexican imports, citing security progress. He affirms that USMCA-compliant imports remain exempt until April 2 and lowers tariffs on non-USMCA potash to 10%.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'us'
  },
  {
    date: 'Mar 10, 2025',
    title: 'Ontario Electricity Surcharge',
    description: 'Ontario, Canada\'s most populous province, responded to Trump\'s economic pressure by introducing a 25% surcharge on electricity exports to the U.S. states of Michigan, Minnesota, and New York.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    country: 'canada-mexico'
  },
  {
    date: 'Mar 11, 2025',
    title: 'Canadian Steel Tariff Threat',
    description: 'Trump threatens to double tariffs on Canadian steel and aluminum to 50% in response to the electricity surcharge, but walks back the decision later that day.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    country: 'us'
  },
  {
    date: 'Mar 11, 2025',
    title: 'Ontario Pauses Surcharge',
    description: 'Premier Doug Ford agreed to pause Ontario\'s 25% electricity surcharge to the U.S. following an invitation from Commerce Secretary Howard Lutnick for a reconciliation meeting in Washington.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'canada-mexico'
  },
  {
    date: 'Mar 12, 2025',
    title: 'Steel and Aluminum Tariffs Take Effect',
    description: 'The updated U.S. tariffs on all foreign steel and aluminum officially take effect.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  },
  {
    date: 'Mar 13, 2025',
    title: 'Canada\'s Second Wave of Tariffs',
    description: 'Canada\'s second wave of 25% retaliatory tariffs takes effect, targeting CA$29.8 billion in U.S. imports.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'canada-mexico',
    tooltip: {
      highlightText: 'CA$29.8 billion in U.S. imports',
      content: (
        <HighlightedText text="#00B9FF[CA$29.8 billion] includes:
$12.6 billion in steel products
$3 billion in aluminum products
$14.2 billion in additional imported U.S. goods (including tools, computers and servers, display monitors, sport equipment, and cast-iron products), comprising steel, aluminum, and other goods." />
      )
    }
  },
  {
    date: 'Mar 24, 2025',
    title: 'Venezuela Oil Tariffs',
    description: 'The United States announces that starting April 2, a 25% tariff will apply to goods imported from countries that purchase oil from Venezuela, whether through direct trade or intermediaries.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  },
  {
    date: 'Mar 26, 2025',
    title: 'Automobile Tariffs Announced',
    description: 'Trump confirms the introduction of 25% tariffs on automobile imports, describing the move as a way to encourage domestic car production. These tariffs are scheduled to begin on April 3 with fully assembled vehicles, followed by additional levies on car parts phased in by May 3.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  },
  {
    date: 'Apr 2, 2025',
    title: 'USMCA-Compliant Goods Update',
    description: 'White House confirms USMCA-compliant goods from Canada and Mexico will remain duty-free indefinitely. Other tariffs may drop from 25% to 12% once demands on immigration and trafficking are met.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'us'
  },
  {
    date: 'Apr 3, 2025',
    title: 'Auto Tariffs Take Effect',
    description: 'The U.S. begins collecting tariffs on imported automobiles, following the policy rollout announced in late March.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  },
  {
    date: 'Apr 9, 2025',
    title: 'Canadian Vehicle Tariffs',
    description: 'Canada\'s 25% tariffs takes effect on U.S. vehicle imports that do not comply with USMCA, including non-Canadian/Mexican content in USMCA-compliant vehicles. Auto parts remain exempt.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    country: 'canada-mexico'
  },
  {
    date: 'Apr 11, 2025',
    title: 'Electronics Tariff Exemption',
    description: 'Trump\'s administration announces a temporary exemption for several categories of electronics, including smartphones, computers, and related devices. These exemptions apply to the 10% global baseline tariff.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  },
  {
    date: 'Apr 13, 2025',
    title: 'Tech Tariff Consideration',
    description: 'Trump signals that the recent exemptions for electronics may be temporary. He states that new tariffs are being considered on computer chips, indicating an escalation in tech-related trade restrictions.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  },
  {
    date: 'Apr 29, 2025',
    title: 'Automotive Sector Relief',
    description: 'Two executive orders are signed by Trump, modifying how tariffs are applied to the automotive sector. The 25% auto tariffs will no longer be compounded with other tariffs, such as those on imported steel and aluminum, offering partial relief to affected automakers.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  }
];

// US-EU timeline events
const usEu: TimelineEvent[] = [
  {
    date: 'Feb 3, 2025',
    title: 'Warning to EU',
    description: 'Trump issues a sharp warning to the European Union, threatening new tariffs and asserting that the bloc has "abused the United States for years," a practice he says must end.',
    icon: <Flag className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'us'
  },
  {
    date: 'Feb 10, 2025',
    title: 'Steel and Aluminum Tariffs',
    description: 'Trump announces the reinstatement of increased tariffs on foreign steel and aluminum, marking a return to a policy first introduced during his previous term. The exemptions granted under the 2018 tariffs are eliminated, resulting in a minimum 25% tariff on all imported steel and an increase in aluminum tariffs from 10% to 25%.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  },
  {
    date: 'Mar 12, 2025',
    title: 'Steel and Aluminum Tariffs Take Effect',
    description: 'The updated U.S. tariffs on all foreign steel and aluminum officially take effect.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  },
  {
    date: 'Mar 12, 2025',
    title: 'EU Response to Steel Tariffs',
    description: 'In response to Trump\'s steel and aluminum tariffs, the European Commission will let its 2018 and 2020 countermeasures against U.S. tariffs expire next month, affecting U.S. goods. A new set of measures will also be ready by mid-April, impacting up to €26 billion ($28.33 billion) in U.S. exports, matching the scope of the U.S. tariffs.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'eu'
  },
  {
    date: 'Mar 13, 2025',
    title: 'Wine Tariff Threat',
    description: 'Trump escalates his rhetoric, threatening to impose a 200% tariff on European wine, Champagne, and spirits unless the EU stops its 50% tariff on whiskey.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'us'
  },
  {
    date: 'Mar 20, 2025',
    title: 'Retaliatory Tariffs Suspended',
    description: 'The European Commission has extended the ongoing suspension of retaliatory tariffs until 14 April 2025.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'eu'
  },
  {
    date: 'Mar 24, 2025',
    title: 'Venezuela Oil Tariffs',
    description: 'The United States announces that starting April 2, a 25% tariff will apply to goods imported from countries that purchase oil from Venezuela, whether through direct trade or intermediaries.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  },
  {
    date: 'Mar 26, 2025',
    title: 'Automobile Tariffs Announced',
    description: 'Trump confirms the introduction of 25% tariffs on automobile imports, describing the move as a way to encourage domestic car production. These tariffs are scheduled to begin on April 3 with fully assembled vehicles, followed by additional levies on car parts phased in by May 3.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  },
  {
    date: 'Apr 2, 2025',
    title: 'Baseline Tariff Implementation',
    description: 'The United States implements a new 10% baseline tariff on imports from all nations effective April 5, with exceptions for products or sectors already facing specific tariffs. Countries running trade surpluses with the U.S. face additional increases, including a newly announced 20% tariff on EU imports.',
    icon: <Flag className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'global'
  },
  {
    date: 'Apr 3, 2025',
    title: 'Auto Tariffs Take Effect',
    description: 'The U.S. begins collecting tariffs on imported automobiles, following the policy rollout announced in late March.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  },
  {
    date: 'Apr 9, 2025',
    title: 'Reciprocal Tariffs Enforcement',
    description: 'Trump\'s new "reciprocal" tariff rates officially take effect, raising duties on imports from dozens of countries just after midnight.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  },
  {
    date: 'Apr 9, 2025',
    title: 'EU Retaliatory Measures',
    description: 'In response, EU member states vote to approve retaliatory tariffs on €20.9 billion ($23 billion) worth of U.S. goods. The European Commission announces that the countermeasures will be introduced in stages: reinstating 2018-2020 counter-tariffs on €8 billion worth of goods starting April 15; followed by a second round of 25% tariffs on an additional €18 billion by May 15 if negotiations fail; and concluding with a final wave of 25% targeting luxury goods, alcohol, and pharmaceuticals from December 1.',
    icon: <AlertTriangle className="h-6 w-6 text-white" />,
    isHighlighted: true,
    country: 'eu'
  },
  {
    date: 'Apr 9, 2025',
    title: 'Tariff Suspension',
    description: 'In a sudden policy shift, Trump announces a 90-day suspension of the newly imposed reciprocal tariff hikes, temporarily unifying tariff levels at 10%.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  },
  {
    date: 'Apr 10, 2025',
    title: 'EU Tariff Pause',
    description: 'Mirroring the U.S. pause, the European Union places its own planned steel and aluminum tariff retaliation on hold for 90 days, giving diplomatic negotiations another window to progress.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'eu'
  },
  {
    date: 'Apr 11, 2025',
    title: 'Electronics Tariff Exemption',
    description: 'Trump\'s administration announces a temporary exemption for several categories of electronics, including smartphones, computers, and related devices. These exemptions apply to the 10% global baseline tariff.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  },
  {
    date: 'Apr 13, 2025',
    title: 'Tech Tariff Consideration',
    description: 'Trump signals that the recent exemptions for electronics may be temporary. He states that new tariffs are being considered on computer chips, indicating an escalation in tech-related trade restrictions.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  },
  {
    date: 'Apr 29, 2025',
    title: 'Automotive Sector Relief',
    description: 'Two executive orders are signed by Trump, modifying how tariffs are applied to the automotive sector. The 25% auto tariffs will no longer be compounded with other tariffs, such as those on imported steel and aluminum, offering partial relief to affected automakers.',
    icon: <Flag className="h-6 w-6 text-white" />,
    country: 'global'
  }
];

// Sort events by date string
const sortedEvents = [...combinedUsChina].sort((a, b) => {
  // Parse date strings into comparable format (assuming format is 'MMM D, YYYY')
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateA.getTime() - dateB.getTime();
});

// Sort Canada/Mexico events by date
const sortedCanadaMexico = [...usCanadaMexico].sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateA.getTime() - dateB.getTime();
});

// Sort EU events by date
const sortedEu = [...usEu].sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateA.getTime() - dateB.getTime();
});

const TimelineComponent: React.FC<{
  events: TimelineEvent[];
}> = ({
  events
}) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleEvents = events.slice(0, visibleCount);
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, events.length));
  };

  // Helper function to highlight text with tooltip if specified
  const renderDescription = (event: TimelineEvent) => {
    if (!event.tooltip) return <p className="text-gray-600">{event.description}</p>;
    
    const { description } = event;
    const { highlightText, content } = event.tooltip;
    
    // Find the text to highlight
    const parts = description.split(highlightText);
    
    if (parts.length === 1) return <p className="text-gray-600">{description}</p>;
    
    return (
      <p className="text-gray-600">
        {parts[0]}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="font-medium text-blue-600">
                {highlightText}
                <Info className="inline-block h-4 w-4 ml-1 text-gray-500 align-text-bottom" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {content}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {parts[1]}
      </p>
    );
  };
  
  // Get icon color based on country type
  const getIconBgColor = (country: string) => {
    switch(country) {
      case 'us': return 'bg-infomineo-blue';
      case 'china': return 'bg-infomineo-red';
      case 'global': return 'bg-green-500';
      case 'canada-mexico': return 'bg-teal-500'; // Changed from purple to teal
      case 'eu': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };
  
  return <div className="relative w-full">
      {/* Timeline center connector line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 to-gray-200" style={{
      zIndex: 0
    }}></div>

      <div className="w-full">
        {visibleEvents.map((event, index) => {
        const isLeftSide = event.country === 'us' || event.country === 'global';
        const iconBgColor = getIconBgColor(event.country);
        
        return <div key={index} className="relative flex mb-12 w-full">
              {/* Timeline node in center */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shadow-sm", 
                  event.isHighlighted 
                    ? "bg-infomineo-gradient" 
                    : iconBgColor
                )}>
                  {event.icon}
                </div>
              </div>
              
              {/* US/Global event on left, China/Canada-Mexico/EU event on right */}
              {isLeftSide ?
          // US/Global Event (Left)
          <>
                  <div className="w-1/2 pr-8">
                    <Card className={cn(
                      "border-l-4 hover:shadow-md transition-shadow duration-300",
                      event.country === 'us' ? "border-l-infomineo-blue" : "border-l-green-500"
                    )}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <span className={cn(
                            "text-sm font-semibold",
                            event.country === 'us' ? "text-infomineo-blue" : "text-green-600"
                          )}>{event.date}</span>
                          <span className={cn(
                            "text-xs font-bold px-2 py-1 rounded-full",
                            event.country === 'us' 
                              ? "bg-infomineo-blue/10 text-infomineo-blue" 
                              : "bg-green-500/10 text-green-600"
                          )}>
                            {event.country === 'us' ? "United States" : "Global"}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        {renderDescription(event)}
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-1/2"></div> {/* Empty right side */}
                </> :
          // China/Canada-Mexico/EU Event (Right)
          <>
                  <div className="w-1/2"></div> {/* Empty left side */}
                  <div className="w-1/2 pl-8">
                    <Card className={cn(
                      "border-l-4 hover:shadow-md transition-shadow duration-300",
                      event.country === 'china' 
                        ? "border-l-infomineo-red" 
                        : event.country === 'eu' 
                          ? "border-l-amber-500" 
                          : "border-l-teal-500" // Changed from purple to teal
                    )}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <span className={cn(
                            "text-sm font-semibold",
                            event.country === 'china' 
                              ? "text-infomineo-red" 
                              : event.country === 'eu' 
                                ? "text-amber-600" 
                                : "text-teal-600" // Changed from purple to teal
                          )}>{event.date}</span>
                          <span className={cn(
                            "text-xs font-bold px-2 py-1 rounded-full",
                            event.country === 'china'
                              ? "bg-infomineo-red/10 text-infomineo-red"
                              : event.country === 'eu'
                                ? "bg-amber-500/10 text-amber-600" 
                                : "bg-teal-500/10 text-teal-600" // Changed from purple to teal
                          )}>
                            {event.country === 'china' 
                              ? "China" 
                              : event.country === 'eu' 
                                ? "European Union" 
                                : "Canada/Mexico"}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        {renderDescription(event)}
                      </CardContent>
                    </Card>
                  </div>
                </>}
            </div>;
      })}
      </div>
      
      {/* Load More Button with background */}
      {visibleCount < events.length && <div className="flex justify-center mt-6 relative z-10">
          <Button onClick={loadMore} variant="outline" className="flex items-center gap-2 bg-white shadow-sm">
            Load More <ChevronDown className="h-4 w-4" />
          </Button>
        </div>}
    </div>;
};

const Timeline: React.FC = () => {
  return <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">A Closer Look at the Most Affected Economies</h2>
        <p className="text-gray-600 text-base">The Trump administration has framed its sweeping tariff strategy as a corrective response to long-standing imbalances in global trade. The top five sources of U.S. imports — Mexico, Canada, China, Switzerland, and Ireland — collectively account for nearly half of all inbound goods, a concentration Trump argues reflects systemic unfairness. With Canada, Mexico, and China alone representing over 40% of total U.S. trade in 2024, they have become central targets in the administration's tariff campaign. The result: a turbulent series of retaliations, negotiations, and policy reversals that are redefining America's trade relationships with its most vital economic partners.	</p>
      </div>

      <Tabs defaultValue="us-china" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-10">
          <TabsTrigger value="us-china">U.S. - China</TabsTrigger>
          <TabsTrigger value="us-canada-mexico">U.S. - Canada/Mexico</TabsTrigger>
          <TabsTrigger value="us-eu">U.S. - European Union</TabsTrigger>
        </TabsList>
        
        {/* U.S. - China Tab Content */}
        <TabsContent value="us-china">
          <div className="mb-6 flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-infomineo-blue rounded-full"></div>
              <span className="font-medium">United States</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="font-medium">Global</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-infomineo-red rounded-full"></div>
              <span className="font-medium">China</span>
            </div>
          </div>
          <TimelineComponent events={sortedEvents} />
        </TabsContent>
        
        {/* U.S. - Canada/Mexico Tab Content */}
        <TabsContent value="us-canada-mexico">
          <div className="mb-6 flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-infomineo-blue rounded-full"></div>
              <span className="font-medium">United States</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="font-medium">Global</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-teal-500 rounded-full"></div> {/* Changed from purple to teal */}
              <span className="font-medium">Canada/Mexico</span>
            </div>
          </div>
          <TimelineComponent events={sortedCanadaMexico} />
        </TabsContent>

        {/* U.S. - EU Tab Content */}
        <TabsContent value="us-eu">
          <div className="mb-6 flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-infomineo-blue rounded-full"></div>
              <span className="font-medium">United States</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="font-medium">Global</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
              <span className="font-medium">European Union</span> {/* Fixed EU label */}
            </div>
          </div>
          <TimelineComponent events={sortedEu} />
        </TabsContent>
      </Tabs>
    </div>;
};
export default Timeline;
