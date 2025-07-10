'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		// Return a div with the default theme class to prevent flash
		return <div className="dark">{children}</div>;
	}

	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
