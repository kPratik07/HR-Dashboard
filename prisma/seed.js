const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create HR user (sole administrator)
  const hrPassword = await bcrypt.hash('hr123', 12);
  const hrUser = await prisma.user.upsert({
    where: { email: 'hr@example.com' },
    update: {},
    create: {
      email: 'hr@example.com',
      password: hrPassword,
      name: 'HR Manager',
      role: 'HR'
    }
  });
  console.log('Created HR user (administrator):', hrUser.email);

  // Create departments - Modern company departments
  const departments = [
    { name: 'Engineering', description: 'Software development, DevOps, and technical operations' },
    { name: 'Product Management', description: 'Product strategy, roadmap, and feature planning' },
    { name: 'Design', description: 'UI/UX design, graphic design, and brand identity' },
    { name: 'Marketing', description: 'Digital marketing, content, and brand management' },
    { name: 'Sales', description: 'Business development and client acquisition' },
    { name: 'Customer Success', description: 'Customer support and relationship management' },
    { name: 'Human Resources', description: 'Talent acquisition, employee relations, and culture' },
    { name: 'Finance & Operations', description: 'Financial planning, accounting, and operations' },
    { name: 'Data & Analytics', description: 'Data science, business intelligence, and analytics' },
    { name: 'Quality Assurance', description: 'Testing, quality control, and automation' }
  ];

  const createdDepartments = [];
  for (const dept of departments) {
    const department = await prisma.department.upsert({
      where: { name: dept.name },
      update: {},
      create: dept
    });
    createdDepartments.push(department);
    console.log('Created department:', department.name);
  }

  // Create roles - Modern tech company roles
  const roles = [
    { name: 'Software Engineer', description: 'Full-stack or specialized software development' },
    { name: 'Senior Software Engineer', description: 'Senior level development with mentorship' },
    { name: 'Tech Lead', description: 'Technical leadership and architecture decisions' },
    { name: 'Engineering Manager', description: 'Manages engineering teams and delivery' },
    { name: 'DevOps Engineer', description: 'Infrastructure, CI/CD, and cloud operations' },
    { name: 'Frontend Developer', description: 'UI development with React, Vue, or Angular' },
    { name: 'Backend Developer', description: 'Server-side development and APIs' },
    { name: 'Full Stack Developer', description: 'End-to-end application development' },
    { name: 'Product Manager', description: 'Product strategy, roadmap, and stakeholder management' },
    { name: 'Senior Product Manager', description: 'Lead product initiatives and teams' },
    { name: 'UI/UX Designer', description: 'User interface and experience design' },
    { name: 'Graphic Designer', description: 'Visual design and brand assets' },
    { name: 'Product Designer', description: 'End-to-end product design and research' },
    { name: 'Digital Marketing Manager', description: 'Digital campaigns and growth strategies' },
    { name: 'Content Writer', description: 'Content creation and copywriting' },
    { name: 'SEO Specialist', description: 'Search engine optimization and organic growth' },
    { name: 'Sales Executive', description: 'B2B/B2C sales and client acquisition' },
    { name: 'Business Development Manager', description: 'Strategic partnerships and growth' },
    { name: 'Customer Success Manager', description: 'Client retention and satisfaction' },
    { name: 'Support Engineer', description: 'Technical customer support' },
    { name: 'HR Manager', description: 'Talent acquisition and employee relations' },
    { name: 'Recruiter', description: 'Sourcing and hiring talent' },
    { name: 'Financial Analyst', description: 'Financial planning and analysis' },
    { name: 'Operations Manager', description: 'Business operations and process optimization' },
    { name: 'Data Scientist', description: 'Machine learning and predictive analytics' },
    { name: 'Data Analyst', description: 'Business intelligence and data visualization' },
    { name: 'QA Engineer', description: 'Manual and automated testing' },
    { name: 'QA Lead', description: 'Quality assurance team leadership' }
  ];

  const createdRoles = [];
  for (const role of roles) {
    const createdRole = await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role
    });
    createdRoles.push(createdRole);
    console.log('Created role:', createdRole.name);
  }

  // Sample employees removed - you can add employees through the UI

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
