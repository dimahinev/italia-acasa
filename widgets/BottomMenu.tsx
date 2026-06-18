import Image from 'next/image';
import Link from 'next/link';

export default function BottomMenu() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 flex justify-around items-center h-16 z-10">
            <Link href="#"></Link>
        </nav>
    );
}
