import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file') || 'pptx';

  let filename = 'Kebbi_2027_Malami_ADC_Situation_Room_Presentation.pptx';
  let contentType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

  if (file === 'pdf') {
    filename = 'Kebbi_2027_Malami_ADC_Situation_Room_Presentation.pdf';
    contentType = 'application/pdf';
  } else if (file === 'budget') {
    filename = 'kebbi_2027_financial_implications_budget.html';
    contentType = 'text/html';
  }

  const filePath = path.join(process.cwd(), 'public', filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse('File not found', { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': fileBuffer.length.toString(),
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
