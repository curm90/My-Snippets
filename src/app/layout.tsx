import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
// import { ThemeProvider } from '@/components/Theme/ThemeProvider';
import { AuthProvider } from '@/components/AuthProvider/AuthProvider';
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
		<html lang='en' suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<AuthProvider>
					{/* <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange> */}
					{children}
					{/* </ThemeProvider> */}
				</AuthProvider>
				<Toaster />
			</body>
		</html>
	);
}
