import dotenv from 'dotenv';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, TemplateAvailability } from '@prisma/client';
import { env } from '../../configs/env';

dotenv.config();

async function seedTemplates() {
  if (!env.databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString: env.databaseUrl,
    }),
  });

  console.log('🌱 Seeding templates...');

  const templates = [
    {
      id: 'tpl_default',
      name: 'Default',
      layoutKey: 'default',
      availability: TemplateAvailability.GLOBAL,
      category: 'Minimalist',
    },
    {
      id: 'tpl_modern_dark',
      name: 'Modern Dark',
      layoutKey: 'modern-dark',
      availability: TemplateAvailability.GLOBAL,
      category: 'Premium',
    },
    {
      id: 'tpl_glass',
      name: 'Glass',
      layoutKey: 'glass',
      availability: TemplateAvailability.GLOBAL,
      category: 'Futuristic',
    },
  ];

  try {
    for (const template of templates) {
      await prisma.template.upsert({
        where: { id: template.id },
        update: {}, // Don't change anything if it already exists
        create: {
          id: template.id,
          name: template.name,
          layoutKey: template.layoutKey,
          availability: template.availability,
          category: template.category,
        },
      });
      console.log(`✅ Upserted template: ${template.name} (${template.id})`);
    }

    // Geoplan-exclusive template: only visible to members of the Geoplan
    // organization (availability ORG_ONLY, scoped by organizationId).
    const geoplanSlug = process.env.GEOPLAN_ORG_SLUG || 'geoplan';
    const geoplanOrg = await prisma.organization.findFirst({
      where: {
        OR: [
          { slug: geoplanSlug },
          { name: { contains: 'geoplan', mode: 'insensitive' } },
        ],
      },
    });

    if (geoplanOrg) {
      await prisma.template.upsert({
        where: { id: 'tpl_geoplan' },
        update: { organizationId: geoplanOrg.id },
        create: {
          id: 'tpl_geoplan',
          name: 'Geoplan',
          layoutKey: 'geoplan',
          availability: TemplateAvailability.ORG_ONLY,
          organizationId: geoplanOrg.id,
          category: 'Corporate',
          config: {
            cardLayoutKey: 'geoplan',
            primaryColor: '#0C55A3',
            accentColor: '#0C55A3',
          },
        },
      });
      console.log(`✅ Upserted Geoplan template for org "${geoplanOrg.name}" (${geoplanOrg.id})`);
    } else {
      console.warn(
        `⚠️  Geoplan organization not found (looked up slug "${geoplanSlug}" / name ~ "geoplan"). ` +
          'Skipped tpl_geoplan. Set GEOPLAN_ORG_SLUG and re-run to attach it.',
      );
    }

    console.log('✨ Seeding completed!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

void seedTemplates();
