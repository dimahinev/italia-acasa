'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';
import { cn } from '@/shared/lib/utils/cn';

const Drawer = ({
    swipeDirection = 'down',
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
    <DrawerPrimitive.Root swipeDirection={swipeDirection} {...props} />
);
Drawer.displayName = 'Drawer';

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Backdrop>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Backdrop>
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Backdrop
        ref={ref}
        className={cn('drawer-backdrop fixed inset-0 z-40 bg-black/40 backdrop-blur-[5px]', className)}
        {...props}
    />
));
DrawerOverlay.displayName = 'DrawerOverlay';

const DrawerContent = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Popup>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Popup>
>(({ className, children, ...props }, ref) => (
    <DrawerPortal>
        <DrawerOverlay />
        <DrawerPrimitive.Viewport className="fixed inset-0 z-40 flex items-end justify-center">
            <DrawerPrimitive.Popup
                ref={ref}
                className={cn(
                    'drawer-popup fixed inset-x-0 bottom-0 z-40 flex h-[82dvh] w-full flex-col rounded-t-[26px] bg-white border-t border-neutral-100 shadow-2xl focus:outline-none',
                    className,
                )}
                {...props}
            >
                <DrawerPrimitive.Content className="flex flex-col h-full min-h-0 w-full">
                    <div className="mx-auto mt-4 h-1.5 w-[62px] rounded-full bg-neutral-200 shrink-0" />
                    {children}
                </DrawerPrimitive.Content>
            </DrawerPrimitive.Popup>
        </DrawerPrimitive.Viewport>
    </DrawerPortal>
));
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Title
        ref={ref}
        className={cn('text-lg font-semibold leading-none tracking-tight', className)}
        {...props}
    />
));
DrawerTitle.displayName = 'DrawerTitle';

const DrawerDescription = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Description
        ref={ref}
        className={cn('text-sm text-neutral-500', className)}
        {...props}
    />
));
DrawerDescription.displayName = 'DrawerDescription';

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
};
