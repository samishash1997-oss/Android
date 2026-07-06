# Secure iPad Service Selection & PDF Export Application

A professional, enterprise-grade iPad application optimized for landscape view that handles dynamic product/service selection, client-side PDF compilation, and native document export.

## Features

- **Split-Screen Design**: Left panel for service selection, right panel for dynamic data table
- **State Management**: Real-time service addition/removal with instant UI updates
- **Client-Side PDF Generation**: Compile selected services into professional A4 PDFs
- **Native System Integration**: Direct system share sheet for AirDrop, print, email, and file save

## Project Structure

```
src/
├── components/
│   ├── LeftPanel.tsx           # Service selection menu
│   ├── RightPanel.tsx          # Dynamic service table
│   └── FinishButton.tsx        # Action button
├── services/
│   ├── pdfGenerator.ts         # Client-side PDF compilation
│   └── shareHandler.ts         # Native share sheet integration
├── types/
│   └── index.ts               # TypeScript interfaces
├── styles/
│   └── app.css                # Landscape-optimized styles
└── App.tsx                    # Main application component
```

## Tech Stack

- React Native / React TypeScript
- PDFKit or similar for client-side PDF generation
- Native APIs for system share sheet

## Development

See individual component files for implementation details.
