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
import { getAllServices } from "@/features/services/data/services";
import {
  ServicesHero,
  ServicesCatalog,
  RepairWorkflow,
  InstantDiagnosticForm,
  ServicesFaq,
  ServicesCtaBanner,
} from "@/features/services/components";
import { SectionHeader } from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: `Services & Laptop Repairs | ${siteConfig.name} Ikeja Lagos`,
  description:
    "Expert laptop motherboard repair, MacBook logic board restoration, cracked screen replacement, battery health renewal, and high-speed SSD/RAM upgrades in Ikeja, Lagos.",
  openGraph: {
    title: `Services & Laptop Repairs | ${siteConfig.name}`,
    description:
      "Certified diagnostic lab for laptops, MacBooks, and electronics repairs with 90-day warranty in Ikeja, Lagos, Nigeria.",
  },
};

export default function ServicesPage() {
  const services = getAllServices();

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
              <BreadcrumbPage>Services & Repairs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* 1. Hero Showcase Banner */}
        <ServicesHero />

        {/* 2. Core Services Catalog Section */}
        <section className="space-y-8">
          <SectionHeader
            title="Professional Electronics Repair Services"
            subtitle="Certified diagnostic inspections and component-level repairs with genuine parts and warranty"
          />

          <ServicesCatalog initialServices={services} />
        </section>

        {/* 3. 4-Step Repair & Waybill Workflow */}
        <RepairWorkflow />

        {/* 4. Instant WhatsApp Diagnostic & Booking Form */}
        <InstantDiagnosticForm />

        {/* 5. Frequently Asked Questions */}
        <ServicesFaq />

        {/* 6. Bottom CTA Banner */}
        <ServicesCtaBanner />
      </div>
    </div>
  );
}
