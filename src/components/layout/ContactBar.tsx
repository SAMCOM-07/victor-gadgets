"use client";

import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { motion } from "motion/react";
import { siteConfig } from "@/config/site";

export function ContactBar() {
  const contactItems = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: siteConfig.contact.address.full,
    },
    {
      icon: Phone,
      title: "Call Us",
      content: siteConfig.contact.phone,
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: siteConfig.contact.workingHours.weekdays,
    },
    {
      icon: Mail,
      title: "Email Us",
      content: siteConfig.contact.email,
    },
  ];

  return (
    <div className="w-full bg-background border-t border-b border-border py-10">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl border border-border flex items-center justify-center shrink-0 text-muted-foreground bg-muted/40">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-snug">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
