'use client'

import { Toaster } from '../components/ui/sonner'
import { QueryClientProvider } from './queryClient'
import { ThemeProvider } from './theme-provider'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<QueryClientProvider>{children}</QueryClientProvider>
			<Toaster richColors />
		</ThemeProvider>
	)
}
