import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/Theme/ThemeProvider';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navigation from '@/components/Navigation/Navigation';
import AppSidebar from '@/components/AppSidebar/AppSidebar';
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
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<SidebarProvider>
						<main className='w-full h-screen bg-background text-foreground'>
							<Navigation />
							<div className='flex pt-[var(--navbar-height)]'>
								<AppSidebar />
								<div className='flex flex-col h-[calc(100vh-var(--navbar-height))] w-full'>
									{children}
								</div>
							</div>
						</main>
					</SidebarProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
