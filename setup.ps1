# HR Dashboard - MongoDB Setup
Write-Host "HR Dashboard Setup" -ForegroundColor Cyan
Write-Host ""

Write-Host "IMPORTANT: Stop dev server first (Ctrl+C)" -ForegroundColor Yellow
Read-Host "Press Enter to continue"

Write-Host ""
Write-Host "Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate

Write-Host "Pushing schema to MongoDB..." -ForegroundColor Yellow
npx prisma db push

Write-Host "Seeding database..." -ForegroundColor Yellow
npm run db:seed

Write-Host ""
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "Run: npm run dev" -ForegroundColor White
Write-Host "Login: admin@example.com / admin123" -ForegroundColor Gray
