import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import Navigation from '@/components/Navigation/Navigation';
import { ThemeProvider } from '@/components/Theme/ThemeProvider';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Snipp',
	description: 'A simple code snippet manager',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang='en' suppressHydrationWarning>
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						<Navigation />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
