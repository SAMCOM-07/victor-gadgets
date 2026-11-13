import { Metadata } from "next";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { siteConfig } from "@/config/site";
import {
  ContactHero,
  ContactInfoCard,
  ContactForm,
  ContactFaq,
  LocationMap,
} from "@/features/contact/components";

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.name} Ikeja Lagos`,
  description:
    "Get in touch with Victor Gadgets. Visit our physical store and repair lab in Ikeja Lagos, chat directly on WhatsApp, or call for gadget inquiries and delivery.",
  openGraph: {
    title: `Contact Us | ${siteConfig.name}`,
    description:
      "Customer support, product enquiries, and repair consultation at Victor Gadgets Ikeja, Lagos, Nigeria.",
  },
};

export default function ContactPage() {
  return (
    <div className="py-8 sm:py-12 bg-background min-h-screen">
      <div className="container space-y-12 sm:space-y-16">
        {/* Breadcrumb Navigation */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Contact</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* 1. Hero Showcase Banner */}
        <ContactHero />

        {/* 2. Main Two-Column Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5">
            <ContactInfoCard />
          </div>

          {/* Right Column: Send Us a Message Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        {/* 3. Physical Store & Ikeja Hub Guide */}
        <LocationMap />

        {/* 4. Frequently Asked Questions */}
        <ContactFaq />
      </div>
    </div>
  );
}
