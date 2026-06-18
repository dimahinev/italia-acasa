import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import PageContainer from '@/shared/ui/layout/PageContainer';
import SearchDrawer from '@/features/search/ui/SearchDrawer';
import Header from '@/widgets/Header';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const recoleta = localFont({
    src: [
        {
            path: '../public/fonts/recoleta/Recoleta Thin.otf',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../public/fonts/recoleta/Recoleta Light.otf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../public/fonts/recoleta/Recoleta Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/recoleta/Recoleta Medium.otf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../public/fonts/recoleta/Recoleta SemiBold.otf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../public/fonts/recoleta/Recoleta Bold.otf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../public/fonts/recoleta/Recoleta Black.otf',
            weight: '900',
            style: 'normal',
        },
    ],
    variable: '--font-recoleta',
    display: 'swap',
});

const ttRoundsNeue = localFont({
    src: [
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Thin.ttf',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Thin Italic.ttf',
            weight: '100',
            style: 'italic',
        },
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial ExtraLight.ttf',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial ExtraLight Italic.ttf',
            weight: '200',
            style: 'italic',
        },
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Light.ttf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Light Italic.ttf',
            weight: '300',
            style: 'italic',
        },
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Italic.ttf',
            weight: '400',
            style: 'italic',
        },
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Medium Italic.ttf',
            weight: '500',
            style: 'italic',
        },
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial DemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial DemiBold Italic.ttf',
            weight: '600',
            style: 'italic',
        },
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Bold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Bold Italic.ttf',
            weight: '700',
            style: 'italic',
        },
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial ExtraBold.ttf',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial ExtraBold Italic.ttf',
            weight: '800',
            style: 'italic',
        },
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Black.ttf',
            weight: '900',
            style: 'normal',
        },
        {
            path: '../public/fonts/tt-rounds-neue-trial/TT Rounds Neue Trial Black Italic.ttf',
            weight: '900',
            style: 'italic',
        },
    ],
    variable: '--font-tt-rounds-neue',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Italia a Casa | Итальянские Косметические Продукты',
    description: 'Премиальная итальянская косметика для волос, тела и полости рта. Доставка на дом.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${recoleta.variable} ${ttRoundsNeue.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Header />
                <PageContainer>
                    {children}
                    <SearchDrawer />
                </PageContainer>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
