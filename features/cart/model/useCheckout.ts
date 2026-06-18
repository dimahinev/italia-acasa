import { useState } from 'react';
import { useCartStore } from './cartStore';
import { useCurrencyStore } from '@/features/currency/model/currencyStore';

export function useCheckout() {
    const items = useCartStore((state) => state.items);
    const clearCart = useCartStore((state) => state.clearCart);
    const { currency } = useCurrencyStore();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: typeof errors = {};
        if (!name.trim()) newErrors.name = 'Numele este obligatoriu';

        const cleanPhone = phone.replace(/[\s\-()]/g, '');
        const phoneRegex = /^\+?\d{8,15}$/;
        if (!phone.trim()) {
            newErrors.phone = 'Telefonul este obligatoriu';
        } else if (!phoneRegex.test(cleanPhone)) {
            newErrors.phone = 'Numărul de telefon nu este valid';
        }

        if (!address.trim()) newErrors.address = 'Adresa este obligatorie';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    phone,
                    address,
                    items,
                    total,
                    currency,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'A apărut o eroare la trimiterea comenzii.');
            }

            setIsSuccess(true);
            clearCart();
        } catch (err: any) {
            setSubmitError(err.message || 'A apărut o eroare neșteptată.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        name,
        setName,
        phone,
        setPhone,
        address,
        setAddress,
        isSuccess,
        isSubmitting,
        submitError,
        errors,
        setErrors,
        total,
        currency,
        items,
        handleSubmit,
    };
}
