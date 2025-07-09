'use client';

import { useSidebar } from '@/components/ui/sidebar';

/**
 * Hook to close mobile sidebar when navigation occurs
 * Use this in components that perform navigation
 */
export function useCloseSidebarOnNav() {
	const { isMobile, setOpenMobile } = useSidebar();

	const closeSidebarOnNav = () => {
		if (isMobile) {
			setOpenMobile(false);
		}
	};

	return closeSidebarOnNav;
}

/**
 * Component that provides click handler to close sidebar on navigation
 */
export default function SidebarNavWrapper({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
